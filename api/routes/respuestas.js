const {Router}=require('express');
const router=Router();
const con=require('../conection/connection');
require('dotenv').config({path:'../env/.env'});
const jwt=require('jsonwebtoken');
const verificacion=Router();

router.get('/',(req,res)=>res.send('<h1>Respuestas</h1>'))

//Ruta de verificacion  
verificacion.use((req,res,next)=>{
    let token=req.headers['x-access-token']||req.headers['authorization'];
    //  console.log(token);  
    
    if(!token){
            res.status(401).send({
                error:'Es necesario un token de autentificacion'
            })
            return
        }
        if(token.startsWith('Bearer ')){
                token=token.slice(7,token.length);
                console.log(token);
        }
        if(token){
            jwt.verify(token,process.env.KEY,(err,decoded)=>{
                if(err){
                    return res.json({
                        message:'El token no es valido'
                    })
                }
                else{
                    req.decoded=decoded;
                    next();
                }
    
            })
        }
});

router.post('/api/respuestas/', verificacion, (req, res) => {

    req.body.respuesta.map(element => {
        con.query('select max(idrespuesta)+1 as idrespuesta from respuestas', (err, id) => {
            let idrespuesta = id[0].idrespuesta;
            if (!idrespuesta) {
                idrespuesta = 1;
            }
            con.query('insert into respuestas set ?',{idrespuesta,respuestas:element},(err)=>{
                if(err)throw err;
                con.query('insert into preguntasrespuestas set ?',{idcuestionarios:req.body.idcuestionarios,idpreguntas:req.body.idpreguntas,idrespuesta:idrespuesta},(err)=>{
                    if(err)throw err;
                
                })
            })
        })
    })
});

module.exports=router;