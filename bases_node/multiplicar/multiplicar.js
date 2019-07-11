const fs = require('fs');
const colors = require('colors')
let data = ''
let tabla = 0;

let listar = (base, limite=10)=>{
    for (let contador = 1; contador <= limite; contador++) {
        console.log(`${base}*${contador}= ${base*contador}`.green);
        
    }
}


let crearArchivos = (base,limite=10)=> {
     return new Promise((resolve, reject) => {
         if(!Number(base)){
             reject(`No es un ${base} numero`);
             return
         }
        for (let contador = 1; contador <= limite; contador++) {
            data = data + (`${base}*${contador} =  ${base * contador} \n `);
            
        }
        
        
        fs.writeFile(`./tablas/tabla-${base}.txt`, data, (err) => {
          if (err) reject(err);
            else
                resolve(`tabla-${base}`);
        
          
        });
        
    });
}

module.exports={
    crearArchivos,
    listar
} 
