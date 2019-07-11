const axios = require('axios');

let getNombres = async (id)=>{

    let encodeUrl = encodeURI(id);
    let result = await axios(`https://jsonplaceholder.typicode.com/users/${encodeUrl}`);
    console.log(result.status)
    if(result.data == ' ' )
        {
            throw new Error(`No existe el usuario que quiere buscar ${id}`)
        }
        return{
            nombre:result.data.name,
            empresa:result.data.company.name

        }

    /*
    let encodeUrl = encodeURI(id)
    console.log(encodeUrl);
    let datosSave = ''
    axios(`https://jsonplaceholder.typicode.com/users/${encodeUrl}`).then((datos)=>{
       // console.log(datos.data.name);
        console.log(`El nombres es ${datos.data[0].name} y trabaj en ${datos.data[0].company.name}`);
    }).catch((error)=>{
        console.log(error);
    })*/
}

module.exports ={
    getNombres
}



