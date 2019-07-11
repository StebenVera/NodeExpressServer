//==============================
//Funcion que autentica el token
//=============================
const jwt = require('jsonwebtoken')


let verificaToken = (req,res,next)=>{
    let token = req.get('token') //Lee el token del header que envio desde el postman o el front
    
     jwt.verify(token,process.env.SEED,(err,decoded)=>{
         if(err){
             return res.status(401).json({ //401 no autorizado
                 ok:false,
                 err:{
                     message:"Token no valido"
                 }
             })
         }

         req.usuario = decoded.usuario;  // aqui obtengo el payload del token
         next()
     })
    
}
//========================
//VerificaAdminRole // Solo el administrador puede crear o editar un nuevo usuario


let verificaAdmin_Role =(req,res,next)=>{
      let usuario = req.usuario
      if(usuario.role === 'ADMIN_ROLE'){
          next()
      }else{
       return res.json({
          ok:false,
          err:{
              message:'El usuario no tiene permisos'
          }
        })
      }
     
}
// =================
// Verifica Token en imagen  por URL
// =================

let verificaTokenImg =(req,res,next)=>{
    let token = req.query.token
    jwt.verify(token,process.env.SEED,(err,decoded)=>{
        if(err){
            return res.status(401).json({ //401 no autorizado
                ok:false,
                err:{
                    message:"Token no valido"
                }
            })
        }

        req.usuario = decoded.usuario;  // aqui obtengo el payload del token
        next()
    })
} 

module.exports ={
    verificaToken,
    verificaAdmin_Role,
    verificaTokenImg
}