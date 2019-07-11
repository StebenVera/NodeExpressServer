//================
//Puerto
//================

process.env.PORT = process.env.PORT || 8080; // no debería ser puerto 80 ?  env? no es produccio ? osea  cuand no esta produccio  va por el 8080


//================
//Entorno
//================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev' //no debería estar en producción?  'dev' 


//================
//Base de Datos
//================

let urlDb
if(process.env.NODE_ENV==='dev')
{
    urlDb='mongodb://localhost:27017/cafe'   //igual aqui solo que le quite la direccion local para forzarlo a la direccion de la db
}else{
   // urlDb='mongodb+srv://admin:123@cafe-idoet.mongodb.net/cafe?retryWrites=true'
   urlDb=' mongodb+srv://admin:dsav1648_@prototypecluster-idoet.mongodb.net/test?retryWrites=true'
  
}

process.env.URLDB = urlDb


//=======================
//Vencimiento del Token 
//=======================
process.env.CADUCIDAD_TOKEN = '48h'//60*60*24*30 // 1 mes

//=======================
//SEDD O SEMILLA
//=======================
process.env.SEED =  process.env.SEED||'secret'


//CLIENTE_ID DE GOOGLE
process.env.CLIENT_ID= process.env.CLIENT_ID || '1037000927925-aathopcm653fpgmau39f0hkcfv0rrih4.apps.googleusercontent.com'