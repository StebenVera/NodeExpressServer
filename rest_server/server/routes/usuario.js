//Metodos HTTP para usuario


//Zona de requires
const express = require('express')

const app = express()

const Usuario = require('../models/usuario')

const bcrypt = require('bcrypt')

const _ = require('underscore')

const {verificaToken,verificaAdmin_Role} = require ('../middlewares/autenticacion')
app.get('/usuario',verificaToken,(req,res)=>{
/*
    return res.json({
        usuario: req.usuario,
        nombre:req.usuario.nombre,  //obtenemos la informacion del payload
        email:req.usuario.email
    })
*/
    /*
    Usuario.find({},(err,usuariosDb)=>{
        if(err) {
            res.status(404).json({
                ok:false
            })
        }
        res.json({
            ok:true,
            usuariosDb
        })

    })*/
    

    //los parametro opcionesles vienen en una variable llamada query, puede que el parametro venga o no 
    //los parametro opcionales se envian http://localhost:8080/usuario?desde=0&limite=1
    let desde = req.query.desde || 0
    desde = Number(desde)
    let limite = req.query.limite || 10
    limite = Number(limite)
    Usuario.find({estado:{$ne:false}},'nombre email role estado google img ')  // la segunda condicion limita que campos queremos que nos traiga
    .skip(desde)    //skip 
    .limit(limite)  //limit nos permite colocar un limite a los registros 
    .exec((err,usuarios)=>{   // aqui hasta ahora se va ejecuta usuario.find
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }

        Usuario.countDocuments({estado:{$ne:false}},(err,conteo)=>{
            res.json({
                ok:true,
                usuarios,
                conteo
            })
        })
        
    })
})

app.post('/usuario',[verificaToken,verificaAdmin_Role],(req,res)=>{  //Colocar entre corchetes cuadrados para tener varios middlewares
    let body = req.body;
        let usuario = new Usuario({
            nombre:body.nombre,
            email:body.email,
            password: bcrypt.hashSync(body.password,10), //Encryptamos la contraseña 
            role: body.role

        })
        try {
        usuario.save((err,usuarioDB)=>{
            if(err){
               return res.status(400).json({
                    ok:false,
                    err
                })
            }

        //ocultar el passsword en la respuesta
        //usuarioDB.password =  null
            res.json({
                ok:true,
                usuarioDB
            });
        });
        }
        catch (error) {
            res.json(
                {
                    ok:false,
                    mensaje:"ocurrio un error al guardar"
                }
            )
        }
})

app.put('/usuario/:id',[verificaToken,verificaAdmin_Role],(req,res)=>{
    let id = req.params.id
    //debemos instalar under score
    let body =_.pick(req.body,['nombre','email','img','role','estado'])
    //delete body.password
    //delete body.google

    //Como 3 parametro mandamos las opciones en este caso
    //new:true  para que nos retorne el objeto actulizado, y runValidators:true para que se que hagan las validaciones que se tienen en el esquema.
    Usuario.findByIdAndUpdate(id,body,{new:true,runValidators:true},(err,usuarioDb)=>{
        if(err){
           return res.status(400).json({
                OK:false,
                err
            })
        }
        res.json({
            ok:true,
            usuario: usuarioDb
        })
    })
    
})

app.delete('/usuario/:id',[verificaToken,verificaAdmin_Role],(req,res)=>{
    let id = req.params.id
    let cambiaEstado = { estado:false}
    //Usuario.findByIdAndRemove(id,(err,usuarioBorrado)=>
    Usuario.findByIdAndUpdate(id,cambiaEstado,{new:true},(err,usuarioBorrado)=>{
        if(err){
            return res.status(400).json({
                 OK:false,
                 err
             })
         }
         if(!usuarioBorrado){
            
            return res.status(400).json({
                 OK:false,
                err:{
                        message:'Usuario no encontrado'
                 }
            })
             
         }

         res.json({
             ok:true,
             usuario : usuarioBorrado
         })
    })

    
})

module.exports = app;