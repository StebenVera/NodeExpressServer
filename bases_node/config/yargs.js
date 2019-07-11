
const opts = 
{
    base:{
      demand:true, // Hace que el comando base sea obligatorio
      alias:'b'
    },
    limite:{
      alias:'l',  
      default:10
    }
}
const argv = require('yargs').command('listar','Imprimi las tablas en consla',opts).command('crear','Imprimi las tablas en consla',opts).help().argv;

module.exports={
    argv
}