const express=require('express');
const con=require('../db/connection');
const router = express.Router();
const jwt=require('jsonwebtoken');
const verificacion=express.Router();
const {key}=require('../key/key')


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
            jwt.verify(token,key,(err,decoded)=>{
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

//ruta inicial
router.get("/",verificacion,(req,res)=>res.send("<h1>Ruta Inicial</h1>"));

  //mostrar preguntas de un cuestionario

  router.get('/api/cuestionarios/preguntas/:idcuestionario',verificacion,(req,res)=>{
    con.query(`SELECT * FROM enlaces pc INNER JOIN preguntas p ON pc.idpreguntas=p.idpreguntas WHERE pc.idcuestionarios=?`,[req.params.idcuestionario],(err,filas)=>{
        if(err)throw err;
        res.send(filas);
        
    });
});
//asignar una pregunta del cuestionario
router.post('/api/cuestionarios/asignarPregunta/:idpreguntas',verificacion,(req,res)=>{
  let idpreguntas=req.params.idpreguntas;
  let idcuestionarios=req.body.idcuestionarios;
  con.query('insert into enlaces set ?',{idcuestionarios,idpreguntas},(err,result3)=>{
    if(err){
     const data={
       icon:'error',
        title:'Esta pregunta ya esta asignada'
     }
     console.log(err);
      res.send(data);
    }
    else{
      const data={
        icon:'success',
        title:'Esta pregunta se asigno con exito'
      }
      res.send(data);
    }
   
  });
});
  

//desasignar una pregunta del cuestionario

router.delete('/api/desasignarPreguntas/',verificacion,(req,res)=>{
  let idpreguntas=req.headers.idpreguntas;
  let idcuestionarios=req.headers.idcuestionarios;
  con.query("delete from enlaces where idpreguntas=? and idcuestionarios=?",[idpreguntas,idcuestionarios],(err,result)=>{
        if(err) console.log(err);
        res.send(result);
    })
})

module.exports=router;