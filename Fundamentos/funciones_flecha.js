function sumar(a,b) {
    return a+b
}

let saludo =()=> 'hola mundo';
console.log(sumar(10,10));
console.log(saludo());


let deadpool = {
    nombre : 'regeracion',
    apellido: 'wiston',
    poder : 'regeracion',
    getNombre: function () {
            return this.nombre +  this.apellido;
    }
}
