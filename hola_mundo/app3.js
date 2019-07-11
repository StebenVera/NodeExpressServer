console.log('Inicio del Program');

setTimeout(function () {
    console.log('Primero Timeout');
},3000)

setTimeout(function () {
    console.log('Segundo Timeout');
},0)

setTimeout(function () {
    console.log('Tercero Timeout');
},0)

console.log('Fin del programa');

