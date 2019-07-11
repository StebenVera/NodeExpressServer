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




let getEmpleado = (id)=>{

     return new Promise((resolve, reject) => {
        let empleadoDB = empleados.find(empleado=> empleado.id === id)
        if(!empleadoDB)
        {
            reject(`No existe el empleado con id ${id}`)
        }
        else
        {
            resolve(empleadoDB)
        }
    });
 
}


let getSueldo = (empleado) =>{

    return new Promise((resolve,reject)=>{

        let salarioDB = salarios.find(salario => salario.id === empleado.id)
        if(!salarioDB)
        {
            reject(`No exites el salario del  empleado que ingreso${empleado.nombre}`);
        }else{
            resolve({
                nombre:'steben',
                apellido :'aragon',
                sueldo:30000000
            })
        }
    })
    



}

getEmpleado(3).then(empleado =>{

       return getSueldo(empleado);
}).then(res =>{
    console.log(res);
}).catch(error=>{
    console.log(error);
})