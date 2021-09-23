//declaro los modulos
const express= require('express');
const cors=require('cors');
const fs=require('fs');
const https=require('https');
//invoco a express
const app= express();
//invoco al puerto
const {port}=require('./key/key');
//invoco a los archivos que contienen las rutas para las peticiones 
const cuestionarios=require('./routes/cuestionario');
const preguntas=require('./routes/preguntas');
const asignarPreguntas=require('./routes/cuestionariosPreguntas');
const respuestas=require('./routes/respuestas');
const login=require('./routes/login');

app.use(cors(),express.json(),express.urlencoded({extended:false}),express.static(__dirname+"/public/"));

//invoco a las rutas 
app.use('/',cuestionarios);
app.use('/',preguntas);
app.use('/',asignarPreguntas);
app.use('/',login);
app.use('/',respuestas);

https.createServer({key:fs.readFileSync('./ssl/server.key'),cert:fs.readFileSync('./ssl/server.cer')},app).listen(port||3000,err=>{
    if(err) throw err;
    console.log (`Funciona en el puerto:${port||3000}`);
});
