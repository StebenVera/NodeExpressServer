const { io } = require('../server');
const {TicketControl}= require('./classes/ticket-control')

let ticketControl = new TicketControl()

io.on('connection', (client) => {
    console.log('Se conecto un nuevo cliente')
    client.emit('estadoActual',{
        estado: ticketControl.getUltimo(),
        ultimos4: ticketControl.getUltimos4()
    })
    client.on('siguienteTicket',(data,callback)=>{
        let siguiente = ticketControl.siguienteTicket() 
        console.log(siguiente)
        callback(siguiente)

    })

    client.on('atenderTicket',(data,callback)=>{
        if(!data.escritorio){
            return callback({
                err:true,
                message:"El escritorio es necesario"
            })
        }
       
        let atenderTicket2 = ticketControl.atenderTicket(data.escritorio)
        callback(atenderTicket2)
        client.broadcast.emit('estadoActual',{
            estado: ticketControl.getUltimo(),
            ultimos4: ticketControl.getUltimos4()
        })
    })


});