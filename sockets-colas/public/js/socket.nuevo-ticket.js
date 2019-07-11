
//Comando para establecer la conexion
var socket = io();

let label = $('#lblNuevoTicket')

socket.on('connect',function(){
    console.log('Conectado con el servidor')

})
socket.on('disconnect',function(){
    console.log('Desconectado del servidor')
})
socket.on('estadoActual',(data)=>{
    label.text(data.estado)
})


$('#btn_crear').on('click',()=>{
    socket.emit('siguienteTicket',null,(ticket)=>{
        //Añadimos texto al nuevo ticket
        label.text(ticket)
    })
})