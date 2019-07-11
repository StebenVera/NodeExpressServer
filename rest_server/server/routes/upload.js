const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()
const Usuario = require('../models/usuario')
const Producto = require('../models/producto')
const fs = require('fs')
const path = require('path')
//fileupload puede tener varias opcines
app.use(fileUpload())


app.put('/upload/:tipo/:id', (req,res)=>{
    let tipo = req.params.tipo
    let id = req.params.id

    if(!req.files){
        return res.status(400).json({
            ok:false,
            err:{
                message:'No se ha seleccionado nigun arhivo'
            }
        })
    }
    
    //Validar tipos
    let tiposValidos = ['productos','usuarios']

    if(tiposValidos.indexOf(tipo)<0){ //Si es menor que cero quiere decir que no encntro coincidencias
        return res.status(400).json({
            ok:false,
            message:'Las tipos validos son '+ tiposValidos.join(', ') //Uno el vector por comas y un espacio
        })
    }



    let archivo = req.files.archivo  //.archivo es el nombre del parametro que le esta llegando
    //Validar extesiones permitidas del arreglo
    let extesionesValidas = ['png','jpg','gif','jpeg']
    let nombreArchivo = archivo.name.split('.') 
    let extension = nombreArchivo[nombreArchivo.length -1] //obtenemos la ultima posicion

    //Comparamos la extesion con el vector de extensiones
    if(extesionesValidas.indexOf(extension)<0){
        return res.status(400).json({
            ok:false,
            message:'Las extensiones permitas son '+ extesionesValidas.join(', ') //Uno el vector por comas y un espacio
        })
    }

   // console.log(extension)
   //Debo renombrar las imagenes de un servidor, para que no se sobreescriba, si vienen
   //varias con el mismo nombre

    //Cambiar el nombre del archivo
    let nombreArchivoF = `${id}-${new Date().getMilliseconds()}.${extension}`
    archivo.mv(`uploads/${tipo}/${nombreArchivoF}`, function(err) {
        if (err)
          return res.status(500).json({
              ok:false,
              err
          });
    
        /*
        res.json({
            ok:true,
            message:'Archivo cargado con exito'
        });*/
        if(tipo =='usuarios'){
            imagenUsuario(id,res,nombreArchivoF)
        }else if(tipo == 'productos'){
            imagenProducto(id,res,nombreArchivoF)
        }
        

      });

})
//Creamos funcion para cargar imagen en el modelo
function imagenUsuario(id, res,nombreArchivoF) { ///Necesitamos enviar el rest ya que el scope se pierde dentro de esta funcion
    Usuario.findById(id,(err,usuarioDb)=>{
        if(err){
            borraArchivo(nombreArchivoF,'usuarios')
            return res.status(500).json({
                ok:false,
                message:'No se encontro el id que esta especificando'
            })
        }

        if(!usuarioDb){
            borraArchivo(nombreArchivoF,'usuarios')
            return res.status(400).json({
                ok:false,
                message:'el usuario no existe'

            })
        }

        //Primero debo verificar que la imagen existe en el filesystem con fs 
      /*  let pathImage =  path.resolve(__dirname,`../../uploads/usuarios/${usuarioDb.img}`)

        if(fs.existsSync(pathImage)) //Funcion sincrona, verifica si el arhivo existe
        {
            fs.unlinkSync(pathImage) // Nos permite elimina un archivo
        }*/
        borraArchivo(usuarioDb.img,'usuarios')
        usuarioDb.img = nombreArchivoF
        usuarioDb.save(err,usuarioGuardado=>{
            res.json({
                ok:true,
                usuario : usuarioDb,
                img:nombreArchivoF
            })
        })


    })
}
function borraArchivo(nombreImagen,tipo) {
    let pathImage =  path.resolve(__dirname,`../../uploads/${tipo}/${nombreImagen}`)

    if(fs.existsSync(pathImage)) //Funcion sincrona, verifica si el arhivo existe
    {
        fs.unlinkSync(pathImage) // Nos permite elimina un archivo
    }
}

function imagenProducto(id,res,nombreArchivoF) {
    Producto.findById(id,(err,productoDb)=>{
        if(err){
            borraArchivo(nombreArchivoF,'productos')
            return res.status(500).json({
                ok:false,
                message:'No se encontro el id que esta especificando'
            })
        }

        if(!productoDb){
            borraArchivo(nombreArchivoF,'productos')
            return res.status(400).json({
                ok:false,
                message:'Este producto no existe'

            })
        }
          
        borraArchivo(productoDb.img,'productos')

        productoDb.img = nombreArchivoF
        productoDb.save((err,productoGuardado)=>{
            res.json({
                ok:true,
                productoGuardado,
                img:nombreArchivoF
            })
        })

    })
    
}
module.exports = app



