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

//peticiones de cuestionario
app.use('/',cuestionarios);
app.use("/api/cuestionarios/",cuestionarios);
app.use('/api/cuestionarios/:id',cuestionarios);

//peticiones de preguntas
app.use('/',preguntas);
app.use('/api/preguntas',preguntas);
app.use('/api/preguntas/:idpregunta',preguntas);
app.use('/api/preguntas/mostrarPreguntasHabilitadas/',preguntas);


//peticiones de asignar preguntas 
app.use('/',asignarPreguntas);
app.use('/api/cuestionarios/preguntas/:idcuestionario',asignarPreguntas);
app.use('/api/cuestionarios/preguntas/',asignarPreguntas);
app.use('/api/cuestionarios/preguntas/:idpregunta',asignarPreguntas);
app.use('/api/desasignarPreguntas/',asignarPreguntas);
app.use('/api/cuestionarios/asignarPreguntas/:idpreguntas',asignarPreguntas);


//registro y inicio de session de usuarios 
app.use('/',login);
app.use('/api/register/',login);
app.use('/api/login/',login);
app.use('/api/loginG',login);

//rutas de respuestas
app.use('/',respuestas);
app.use('/api/respuestas/',respuestas);


https.createServer({key:fs.readFileSync('./ssl/server.key'),cert:fs.readFileSync('./ssl/server.cer')},app).listen(port||3000,err=>{
    if(err) throw err;
    console.log (`Funciona en el puerto:${port||3000}`);
});
