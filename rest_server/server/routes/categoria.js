const express = require ('express')
const app = express()

let {verificaToken,verificaAdmin_Role} = require('../middlewares/autenticacion')
let Categoria = require('../models/categoria')



//Mostrar todas las categorias
app.get('/categoria',verificaToken,(req,res)=>{
    /*
    Categoria.find({},(error,categoriaDB)=>{
        if(error){
            return res.status(400).json({
                ok:false,
                error
            })
        }
        Categoria.countDocuments({},(err,contador)=>{
            if(err){
                return res.status(400).json({
                    ok:false,
                    error
                })
            }
            return res.json({
                ok:true,
                categoriaDB,
                contador
            })
        })
    })
    */
    Categoria.find({})
        .sort('descripcion')
        .populate('usuario','nombre email') //Se ejecuta antes del find
        .exec((err,categorias)=>{ 
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                })
            }
           res.json({
               ok:true,
               categorias
           })
        })

})


//Mostras una categoria por id
app.get('/categoria/:id',verificaToken,(req,res)=>{
    let id = req.params.id
    Categoria.findById(id,(err,categoriaDB)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        if(!categoriaDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message:"El id no valido"
                }
            })
        }
        res.json({
            ok:true,
            categoria: categoriaDB
        })
    })

})

app.post('/categoria',verificaToken,(req,res)=>{
    //Regresa la nueva categoria
    //req.usuario._id
    let body = req.body
    let usuario = req.usuario
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: usuario._id
    })


    categoria.save((err,categoriaDB)=>{
        if(err){
            return res.status(500).json({ //Error interno del servidor o de la BD
                ok:false,
                err
            })
        }
        if(!categoriaDB){
            return res.status(400).json({  // Bad request
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            categoria:categoriaDB
        })
    })

})

//Actulizar la categoria
app.put('/categoria/:id',verificaToken,(req,res)=>{

    let id = req.params.id; // Obtenemos el id por params
    let body = req.body
    let descCategoria = {
        descripcion:body.descripcion
    }
    Categoria.findByIdAndUpdate(id,descCategoria,{new:true,runValidators:true},(err,categoriaDB)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        if(!categoriaDB){
            return res.status(400).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            categoria:categoriaDB
        })

    })
    
})


app.delete('/categoria/:id',[verificaToken,verificaAdmin_Role],(req,res)=>{
        //solo un administrador puede borrar una categoria
        //findByIdAndRemove

        let id = req.params.id
        Categoria.findByIdAndRemove(id,(err,categoriaDB)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                })
            }
            if(!categoriaDB){
                return res.status(400).json({
                    ok:false,
                    err:{
                        menssage:'El id no existe'
                    }
                })
            }

            res.json({
                ok:true,
                message: 'Categoria Borrada'
            })
        })
})

module.exports = app;