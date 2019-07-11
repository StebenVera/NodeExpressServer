const {crearArchivos,listar} = require('./multiplicar/multiplicar')
const {argv} = require('./config/yargs')



//let parametro = argv[1];
//let base = parametro.split('=');

console.log(argv.b);

switch (argv._[0]) {
  case 'listar':
    listar(argv.b,argv.limite);
    break;
  case 'crear':
    crearArchivos(argv.b,argv.limite).then(
      res=>{
        console.log(res);
      }
    ).catch(err=>{
      console.log(err);
    })
    break;

  default:
    console.log('Comando invalido');
    break;
}


//console.log(module);


