const express = require('express');

const path = require('path');

const http = require('http');

const app = express();

let server = http.createServer(app); // Creamos un servidor directtamente en node ya que socke io no trabaja directamente con express

const socketIO = require('socket.io') // Importamos la libreria de socket io


const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));


//Inicioalizamos el socket  IO =>  Inputs y outputs   comunicacion con el backend del servidor
//let io = socketIO(server)

module.exports.io= socketIO(server) // Expo

//Importamos el archivo de socket
require('../server/sockets/socket')

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});