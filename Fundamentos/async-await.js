let empleados = [{
    id: 1,
    nombre: 'steben vera'

}, 
{
    id:2,
    nombre: 'kathe moscoso'
},
{
    id:3,
    nombre: 'betancurt'


}]

let salarios= [{
    id:1,
    salario:2000
},{
    id:2,
    salario:5000
}];

let getEmpleado = async (id) =>{
    
    let empleadoDB = empleados.find(empleado => empleado.id === id)
    if(!empleadoDB){
        throw new Error(`El empleado con ID ${id} no existe`);
    }
    
    return empleadoDB
}

getEmpleado(12).then(empleado=>{
    console.log(empleado);
}).catch(error=>{
    console.log(error);
})