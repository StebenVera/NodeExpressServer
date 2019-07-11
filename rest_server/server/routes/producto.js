const expres = require('express')
const app = expres()

const {verificaToken}  = require('../middlewares/autenticacion')

let Producto = require('../models/producto')


//=============================
//Obtener todos los productos
//=============================
app.get('/productos',verificaToken,(req,res)=>{
    //Trae tods los productos
    //Populado el usuario y la categoria
    //paginado
    let desde = Number(req.query.desde || 0)

    Producto.find({disponible:true})
    .skip(desde)
    .limit(5)
    .populate('categoria','descripcion')
    .populate('usuario','nombre email')
    .exec((err,productoDB)=>{
        if(err)
        {
            return res.status(500).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            productoDB
        })
    })
})

//=============================
//Obtener un producto por ID
//=============================
app.get('/productos/:id',verificaToken,(req,res)=>{
    let id = req.params.id
    Producto.findById(id,(err,productoDB)=>{
        if(!productoDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message:"No existe este producto"
                }
            })
        }
        if(err)
        {
            return res.status(500).json({
                ok:false,
                err
            })
        }
        
        res.json({
            ok:false,
            productoDB
        })
    })
})

//=============================
//Buscar un producto por ID
//=============================
app.get('/productos/buscar/:termino',verificaToken,(req,res)=>{
    let termino = req.params.termino
    let regex = new RegExp(termino,'i')
Producto.find({nombre:regex})
        .populate('categoria','descripcion')
        .exec((err,productoDB)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    productoDB
                })
            }
            res.json({
                ok:true,
                productoDB
            })
        })

})

//=============================
//Crear un producto por ID
//=============================
app.post('/productoS',verificaToken,(req,res)=>{
    //Grabar el usuario
    //Grabar una categoria de listad
    let body = req.body
    let usuario = req.usuario._id
    let producto = new Producto({
        usuario,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion:body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
    })
    producto.save((err,productoDB)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        res.status(201).json({  //Status 201 crea un nuevo registro 
            ok:true,
            productoDB
        })
    })

})

//=============================
//Actualizar un producto por ID
//=============================
app.put('/productos/:id',verificaToken,(req,res)=>{
    let id = req.params.id
    let body = req.body

    producto = {
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion:body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
    }

    Producto.findByIdAndUpdate(id,producto,{new:true,runValidators:true},(err,productoDB)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        if(!productoDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message:"Este producto no existe"
                }
            })
        }
        res.json({
            ok:true,
            producto:productoDB
        })
    })

})

//=============================
//Eliminar un producto por ID
//=============================
app.delete('/productos/:id',verificaToken,(req ,res)=>{
    let id = req.params.id

    Producto.findByIdAndUpdate(id,{disponible:false},(err,productoDB)=>{
        if(!productoDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message:"No existe este producto"
                }
            })
        }
        if(err)
        {
            return res.status(500).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            productoDB,
            message:"Producto eliminado con exito"
        })
    })

})




module.exports = app