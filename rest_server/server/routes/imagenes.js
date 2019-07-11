const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
let {verificaTokenImg} = require('../middlewares/autenticacion')
app.get('/foto/:tipo/:img',verificaTokenImg,(req,res)=>{
 let tipo = req.params.tipo
 let img = req.params.img
 let pathImage = path.resolve(__dirname,`../../uploads/${tipo}/${img}`)
 

    if(fs.existsSync(pathImage)){
        res.sendFile(pathImage)
    }else{
        res.sendFile(path.resolve(__dirname,'../assets/no-image.jpg'))
    }
 

})

module.exports = app
