 //Definimos funciones para enviar o recibir informacion del servidor

 var socket = io(); //

 socket.on('connect',function () {
     console.log('Conectado al servidor'); // Se va ejecutar cuando hay una conexion con el servidor
        //Escuchar informacion

 })


 //.on nos permiten escuchar eventos o sucesso
 socket.on('disconnect',function () {
     console.log('Desconectado del servidor') // Se va ejecutar cuando hay una desconexion con el servidor
 })

 //.emit nos permite enviar información en este caso enviamdo un objeto
 socket.emit('enviarMensaje',{
     usuario:'Fernando',
     mensaje:'Hola mundo'
 },function(resp){    //Nos permite obtener una retroalimentacion desde el servidor
   console.log('respuesta server',resp.res)
 })

 socket.on('enviarMensaje',function (data) {
         console.log('informacion del servidor',data)
     })