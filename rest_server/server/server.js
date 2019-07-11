require('./config/config')
//Zona de Require
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')
//Definimos el puerto por el que se va escuchar


/*Para obtener información del payload fecha de creacion y expiracion del token desde el fron*/
/*
    function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
    };
 */

//ZONA DE MIDLEWARE
//x-wwww-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//Habilitamos carpeta publica
app.use(express.static(path.resolve(__dirname,'../public')))

//REFERENCIA AL ARCHIVO QUE TIENE LAS RUTAS
app.use(require('./routes/index'))


//Conexión con la base de datos, y crea la bd en mongoDb
mongoose.connect(process.env.URLDB ,{useNewUrlParser:true,useCreateIndex:true},(err,res)=>{
    if(err){
        throw new Error('No se pudo realizar la conexion a la base de dato');
    }
    
        console.log('Base de datos online');
    
});

app.listen(process.env.PORT,()=>{
    console.log('Escuchando por el puerto', process.env.PORT);
}
)
