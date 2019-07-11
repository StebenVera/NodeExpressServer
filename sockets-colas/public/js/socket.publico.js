var socket = io();  // Comando para establecer la conexion 

let lblTicket1 = $('#lblTicket1')
let lblEscritorio1 = $('#lblEscritorio1')
let lblTicket2 = $('#lblTicket2')
let lblEscritorio2 = $('#lblEscritorio2')
let lblTicket3 = $('#lblTicket3')
let lblEscritorio3 = $('#lblEscritorio3')
let lblTicket4 = $('#lblTicket4')
let lblEscritorio4 = $('#lblEscritorio4')

var lblTickets =[lblTicket1,lblTicket2,lblTicket3,lblTicket4]
var lblEscritorios =[lblEscritorio1,lblEscritorio2,lblEscritorio3,lblEscritorio4]
socket.on('estadoActual',(data)=>{
    console.log(data.ultimos4)
    //lblTicket1.text('Turno '+data.ultimos4[0].numero)
    //lblEscritorio1.text('Escritorio '+data.ultimos4[0].escritorio)
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play()
    actualizaHtml(data.ultimos4)
})

function actualizaHtml(ultimos4) {
    for (let i = 0; i < ultimos4.length; i++) {
        lblTickets[i].text('Turno'+ultimos4[i].numero)  
        lblEscritorios[i].text('Escritorio'+ultimos4[i].escritorio)      
    }
}

