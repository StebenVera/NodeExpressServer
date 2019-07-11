const express = require('express');
const app = express();
const hbs = require('hbs')

//obtener puerto de heroku
const port = process.env.PORT || 8080 ;


require('./hbs/helpers')
//Zona de middleware

//servimos los archivos de la carpeta publi
app.use(express.static(__dirname+'/public'));

//Manejador de errores
/*
app.use((req,res,next)=>{
    res.status(404).send('No existe la direccion que esta buscando');
})*/

//configuramos hbs como manejador de plantillas
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');



app.get('/',(req,res)=>{
    
    res.render('home',{
        nombre:'daiver steben',
        
    });
})

app.get('/about',(req,res)=>{
    res.render('about');
})


app.listen(port,()=>{
   console.log(`Escuchando peticion en el puerto ${port}`);
})