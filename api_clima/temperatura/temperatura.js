let axios = require('axios');


let getTemperatura = async (lat,long)=>{
    
    let respuesta = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&APPID=206e969eff9912b269f85013462d3941`)
    
    return respuesta.data.main.temp
}


module.exports={
    getTemperatura
}