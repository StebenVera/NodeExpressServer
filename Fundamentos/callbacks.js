/*setTimeout(()=>{
    console.log('Hola mundo');
},2000);

let getUserById = (id,callback) =>{
    let datos = {
        nombre : 'steben',
        id    //id:id  cuando la propiedad se llama igual que el  parametro podemos dejar el mismo nombre

    }

    if(id === 20){
        callback(`El usuario ${id} no existe en la bd`);
    }
    else{
        callback(null,datos);
    }
    
}


getUserById(2,(err,data)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('los datos son',data);
    }
    
})
*/
var express = require('express');
var app = express();


app.get('/prueba',(req,res)=>{
    console.log(req)
   // res.send('hola mundo');
})


app.listen(8080);