const express = require('express')

const bcrypt = require('bcrypt')

const Usuario = require('../models/usuario')

const jwt = require('jsonwebtoken')

const app = express()

const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client(process.env.CLIENT_ID);

app.post('/login',(req,res)=>{
   let body = req.body;

    //Retorna un solo usuario si existe y si el email que viene en el body existe
   Usuario.findOne({email:body.email},(err,usuarioDB)=>{
       if(err){
           return res.status(500).json({
               ok:false,
               err
           })
       }
       if(!usuarioDB){    // si el usuario no existe retorna error 
        return res.status(400).json({
                ok:false,
                err:{
                    message:'(Usuario) o Contraseña Incorrecta'
                }
            }
        )
       }
       if(!bcrypt.compareSync(body.password,usuarioDB.password))  //Si las contraseñas no son iguales 
       {
        return res.status(400).json({
            ok:false,
            err:{
                message:'Usuario o (Contraseña) Incorrecta'
            }
        })
       }
       let token = jwt.sign({
           usuario:usuarioDB //Payload que quiero guardar en el token
       },process.env.SEED,{expiresIn: process.env.CADUCIDAD_TOKEN})  //el secret permite comparar los token 
       res.json({
           ok:true,
           usuario:usuarioDB,
           token
       })
   })
})
//Creamos ruta para verificar el token que nos esta enviando el front

//configuraciones de google
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
  //  console.log(payload.name) //Obtenemos los datos que necesitamos del payload
  //  console.log(payload.email)
  //  console.log(payload.picture)

    return {
        nombre:payload.name,
        email:payload.email,
        img:payload.picture,
        google:true
    }

  }

app.post('/google', async(req,res)=>{
    let token = req.body.idtoken

    let googleUser = await verify(token).catch(e=>{
        return res.status(403).json({
            ok:false,
            err:e
        })
    })
   // console.log(googleUser)
    
   
    Usuario.findOne({email:googleUser.email},(err,usuarioDb)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        if(usuarioDb){
           if(usuarioDb.google === false){
                return res.status(400).json({
                    ok:false,
                    err:{
                        message: 'Debe autenticarse con el usuairo creado con el correo'
                    }
                })
           }else{
               //Renuevo el token ya que google es true
                let token = jwt.sign({
                    usuario:usuarioDb //Payload que quiero guardar en el token
                },process.env.SEED,{expiresIn: process.env.CADUCIDAD_TOKEN})  //el secret permite comparar los token 

                return res.json({
                    ok:true,
                    usuario:usuarioDb,
                    token
                })
            }
        }else{
            //Si el usuairo no existe en nuestra base de datos
            let usuario = new Usuario()

            usuario.nombre = googleUser.nombre
            usuario.email = googleUser.email
            usuario.img = googleUser.img
            usuario.google = true
            usuario.password = bcrypt.hashSync(':)',10)

            usuario.save((err,usuarioDb)=>{
                if(err){
                    return res.status(500).json({
                        ok:false,
                        err
                    })
                }
              
                let token = jwt.sign({
                    usuario:usuarioDb //Payload que quiero guardar en el token
                },process.env.SEED,{expiresIn: process.env.CADUCIDAD_TOKEN})  //el secret permite comparar los token 

                return res.json({
                    ok:true,
                    usuario:usuarioDb,
                    token
                })
            })
        }
    })
    /*
    res.json({
        usuario:googleUser
    })*/
})

module.exports = app