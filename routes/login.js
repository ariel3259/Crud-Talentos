const {Router}= require('express');
const bcryptjs=require('bcryptjs');
const con=require('../db/connection');
const jwt=require('jsonwebtoken');
const router=Router();
const {key}=require('../key/key');
router.get('/',(req,res)=>res.send('Pagina principal'));

//REGISTER
router.post('/api/register/',async (req,res)=>{
con.query('select max(idUser)+1 as idUser from users',async (err,result)=>{
    if(err)throw err;
    if(result[0].idUser==null){
        result[0].idUser=1;
    }
    const data={
        idUser:result[0].idUser,
        user:req.body.user,
        password:await bcryptjs.hash(req.body.password,8),
        rol:"user",
        fullName:req.body.fullName
    };
    con.query('insert into users set ?',data,(err,result)=>{
        if(err){
            const datas={
                success:false,
                icon:'error',
                title:'REGISTRO FALLIDO',
                text:'el usuario ya existe',
                showConfirmButton:false,
                timer:3000
            }
        res.send(datas);
        }
       else{
        
        const datas={
            success:true,
            icon:'success',
            title:'REGISTRO COMPLETADO',
            text:'',
            showConfirmButton:false,
            timer:3000,
        };
        res.send(datas);
       }
    })
});
});

//LOGIN 

router.post('/api/login/',async (req,res)=>{
        
        const data={
            user:req.body.user,
            password:req.body.password
        }; 
        let {user}=data;
         con.query('select * from users where user=?',[user],async (err,result)=>{
        if(err)throw err;
        if(result.length==0 || !(await bcryptjs.compare(data.password,result[0].password))){
            console.log(err);
            const datas={ 
                icon:'error',
                title:'SESSION FALLIDA',
                text:'usuario o contraseña incorrectos',
                showConfirmButton:false,
                timer:1500,
                success:false
            }
            res.send(datas);
        }
        else{
            const data={    
                icon:'success',
                title:'SESSION INICIADA',
                text:`Bienvenido ${user}`,
                showConfirmButton:false,
                timer:1500,
                user:user,
                idUser:result[0].idUser,
                success:true,
                token:jwt.sign({check:true},key,{expiresIn:'30m'})
            };
            res.send(data);
        }
    });
});

router.post('/api/loginG',(req,res)=>{
        con.query("select * from users where uid=?",[req.body.uid],(err,result)=>{
            if(err)console.log(err);
            if(result[0]){
                if(result[0].uid==req.body.uid){ 
                    
                    const datas={
                    icon:'success',
                    title:'SESSION INICIADA',
                    text:`Bienvenido ${result[0].user}`,
                    showConfirmButton:false,
                    timer:1500,
                    user:result[0].user,
                    idUser:result[0].idUser,
                    success:true,
                    token:jwt.sign({check:true},key,{expiresIn:'30m'})
                };
   
                res.send(datas);}
            }
            else{
             
                con.query("select max(idUser)+1 as idUser from users",(err,id)=>{
                    if(err)throw err;
                    if(!id[0].idUser){
                        id[0].idUser=1;
                    }
                    const data={
                      idUser:id[0].idUser,
                      user:req.body.displayName,
                      uid:req.body.uid,
                      rol:"user"
                  };
                  con.query("insert into users set?",data,(err)=>{
                      if(err)throw err;
   
                  const datas={
                      icon:'success',
                      title:'SESSION INICIADA',
                      text:`Bienvenido ${data.user}`,
                      showConfirmButton:false,
                      timer:1500,
                      user:data.user,
                      idUser:data.idUser,
                      success:true,
                      token:jwt.sign({check:true},key,{expiresIn:'30m'})
                  };
                  res.send(datas);     
                  console.log()
                  });
                });
           }
           
        })
 
});
module.exports=router;