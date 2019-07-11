const http = require('http');

http.createServer((req,res)=>{

    res.writeHead(200,{'Content-Type':'application/json'});
    let datos={
        nombre:'daiver',
        apellido:'aragon',
        ulr: req.url
    }
    res.write(JSON.stringify(datos));
    res.end();
}).listen(8080);
console.log("Escuchando por el puerto 8080");



