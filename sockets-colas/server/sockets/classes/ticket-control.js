const fs = require('fs')


class Ticket{
    constructor(numero,escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


class TicketControl {
    constructor(){
            //Se dispara cuando usuo la clase con el new
            this.ultimo = 0
            this.hoy = new Date().getDate()
            this.tickets = []
            this.ultimos4 = []
            let data = require('../../data/data.json')
            if(data.hoy == this.hoy){
                //Si se reinicia el servidor se continua el  ultimo ticket
                this.ultimo = data.ultimo
                this.tickets = data.tickets
                this.ultimos4 = data.ultimos4
            }else{
                //Es porque es otro dia entonces debemos reiniciar el contador
                this.reiniciarConteo()
            }
        
    }

    siguienteTicket(){
        this.ultimo+=1

        let ticket = new Ticket(this.ultimo,null)
        this.tickets.push(ticket) //Agrega un valor en la ultima posicion a un vector
        this.grabarArchivo()

        return `Tickect ${this.ultimo}`
    }

    reiniciarConteo(){
        this.ultimo=0
        this.tickets = []
        this.ultimos4=[]
        console.log('Se ha reniciado el sistema')
        this.grabarArchivo()
    }

    grabarArchivo(){
        let jsonData = {
            ultimo : this.ultimo,
            hoy : this.hoy,
            tickets :this.tickets,
            ultimos4 : this.ultimos4
        }

        let jsonDataString = JSON.stringify(jsonData)  //   Convierto un json a strin

        fs.writeFileSync('./server/data/data.json',jsonDataString)
    }

    getUltimo(){
        return `Tickect ${this.ultimo}`
    }
    getUltimos4(){
        return this.ultimos4
    }
    atenderTicket(escritorio){
        if(this.tickets.length === 0)  //Verificamos que el vector esta vacio
        {
            return 'No hay ningun ticket que atender';

        }
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift(); //elimino el primer elemento de un vecto

        let atenderTicket = new Ticket(numeroTicket,escritorio)
        this.ultimos4.unshift(atenderTicket) //Agrega un valor al principio del vector
        if(this.ultimos4.length > 4){
            this.ultimos4.splice(-1,1) //Borra el ultimo elemento del arreglo
        }

        this.grabarArchivo()

        return atenderTicket
    } 
}


module.exports = {
    TicketControl
}