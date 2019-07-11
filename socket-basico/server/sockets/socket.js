const {io} = require('../server')
io.on('connection',(client)=>{
    console.log('Hay un usuario conectado ')  // Nos permite detectar cuando un usuario se conecta

    client.on('disconnect',()=>{  //Nos permite saber cuando un usuario se desconecta
        console.log('Usuario Desconectado')
    })
    
    //Escuchamos informacion que nos esta enviando el cliente
    client.on('enviarMensaje',(data)=>{
        /*
        if(data.usuario){
            callback({res:'Todo salio bien'})   //Nos permite enviar una retroalimentacion al cliente
        }else{
            callback({res:'Todo salio mal'})  //Nos permite enviar una retroalimentacion al cliente
        }*/
        console.log(data)

        client.broadcast.emit('enviarMensaje',data)  //Broadcast envia el mensaje a todos los clientes
    })

    client.emit('enviarMensaje',{
        usuario:'administrador2',
        mensaje:'Bienvenido a esta app'
    })
})