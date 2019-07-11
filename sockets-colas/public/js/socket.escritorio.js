// Comando para establecer la conexión
var socket = io();


var searchParams = new URLSearchParams(window.location.search);  //Nos permite obtener los parametro por la barra del url

//console.log(searchParams.has('escritorio')) //Esto retorna true

if(!searchParams.has('escritorio')){
    window.location('index.html')
    throw new Error('El escritorio es necesario')
}

let escritorio = searchParams.get('escritorio')
console.log(escritorio)
let label = $('small')
$('H1').text('Escritorio'+escritorio)

$('button').on('click',()=>{
    socket.emit('atenderTicket',{escritorio:escritorio},(ticketAtender)=>{
        //console.log(ticketAtender)
        if(ticketAtender ==='No hay ningun ticket que atender'){
             alert(ticketAtender)
             return
        }
        label.text(ticketAtender.numero)
    })
})
