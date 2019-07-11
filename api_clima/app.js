const argv = require('yargs').options({
    latitud:{
        alias:'la',
        desc:'Ingrese la latitud de la ciudad que desea buscar',
        demand:true
    },
    longitud:{
        alias:'lo',
        desc:'Ingrese la longitud de la ciudad que desea buscar',
        demand:true
    }
}).argv
//const axios = require('axios');
let {getNombres} = require('./lugar/lugar');
let {getTemperatura}= require('./temperatura/temperatura');

let encodeLatitud = encodeURI(argv.latitud);

let encondeLongitud = encodeURI(argv.longitud);
console.log(encodeLatitud);
console.log(encondeLongitud);

/*
getNombres(encodeURL).then((res)=>{
    console.log(res);
}).catch((error)=>{
    console.log(error);
})*/
//console.log(argv.institucion);

getTemperatura(encodeLatitud,encondeLongitud).then((res)=>{
    console.log(`La temperatura de las coordenadas ingresadas es ${res} ℃`);
}).catch((error)=>{
    console.log(error)
})

