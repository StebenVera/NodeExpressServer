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

let getEmpleado = (id,callback)=>{

    let empleadoDB = empleados.find( empleado => empleado.id === id)
    
    if(!empleadoDB)
    {
        callback(`No existe el empleado con ${id}`);
    }
    else{
        callback(null,empleadoDB);
    }
}

let getSueldo = (empleado,callback) =>{

        let salarioDB = salarios.find(salario => salario.id === empleado.id)

        if(!salarioDB)
        {
            callback(`No exites el salario del  empleado que ingreso${empleado.id}`);
        }else{
            callback(null,{
                nombre: empleado.nombre,
                sueldo: salarioDB.salario,
                id: empleado.id
            });
        }

}

getEmpleado(1,(error,empleado)=>{
    if(error){
        console.log(error);
    }else{
        getSueldo(empleado,(error,data)=>{
            if(!error)
             {
                console.log(data);
            }
        })
    }

});

