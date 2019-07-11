let deadpool = {
        nombre : 'regeracion',
        apellido: 'wiston',
        poder : 'regeracion',
        getNombre: function () {
                return this.nombre +  this.apellido;
        }
}


let {nombre,apellido,poder} = deadpool;

console.log(nombre);