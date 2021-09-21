

$(document).ready(function () {
    let url = 'http://localhost:3000/api/cuestionarios/preguntas/';
    let urlPreguntas = 'http://localhost:3000/api/preguntas/mostrarPreguntasHabilitadas/';
    let urlAsignar = 'http://localhost:3000/api/cuestionarios/asignarPregunta/';
    let opcion = null;
    let respuesta=[];
    const token=sessionStorage.getItem('token');
    let idpreguntas, idcuestionarios;
    let modalAsignar = new bootstrap.Modal(document.getElementById('modalAsignar'))
    document.getElementById("mostrarNombre").innerHTML+=sessionStorage.getItem("usuarioCreador");
  

    //idcuestionario es igual al valor de la llave idcuestionario2 mediante el metodo del objeto sessionStorage, y es convertida a numero mediante la función parseInt
    idcuestionarios =parseInt(sessionStorage.getItem("idcuestionarios"),10);
    let titulo=sessionStorage.getItem("titulo");
    
    //document.getElementById("titulo").innerHTML=`Cuestionario N°: ${idcuestionarios} <br> `;
    document.getElementById("subtitulo").innerHTML=`Título: ${titulo}`;
    let estado="Habilitado";
    
    let tablaPreguntas=$('#tablaPreguntas').DataTable({'language':{"url": "http://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"}});
    let tablaCuestionarios=$('#tablaCuestionario').DataTable({'language':{"url": "http://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"}});

//MOSTRAR PREGUNTAS EN EL MODAL DE ASIGNAR PREGUNTAS
    function mostrarPreguntas(){
        tablaPreguntas.clear().draw();
        let defaultContent="<div class='text-center'><div class='btn-group'><button class='btn btn-outline-info btn-sm btnAsignar'>Asignar al cuestionario</button></div></div>";
        if(token!="null"){
            fetch(urlPreguntas,{
                method:'get',
                mode:'cors',
                headers:{
                    'Content-Type':'application/json',
                    'authorization':token,
                    'idcuestionarios':idcuestionarios,
                    'estado':estado
                }
            }).then(response=>response.json())
            .then(res=>res.map(element=>tablaPreguntas.row.add([element.idpreguntas,element.descripcion,element.categoria,defaultContent]).draw()))
            .catch(err=>console.error(err))
        }else{
            Swal.fire({icon:'error',title:'Inicie sesion primero',showConfirmButton:false,timer:1200}).then(()=>{
                  //el usuario se elimina
                  sessionStorage.setItem('usuario',null);
                  //el token se elimina
                  sessionStorage.setItem('token',null);
                window.location.replace('http://localhost:3000/')
            })
        }
        
    }
    //mostrar Preguntas del Cuestionario
    function mostrarCuestionarios(){
        tablaCuestionarios.clear().draw();
        let defaultContent="<div class='text-center'><div class='btn-group'><button class='btn btn-outline-danger btn-sm btnBorrar'>Desasignar</button><button class='btn btn-outline-info btnAnadirRespuesa' >Añadir Respuestas</button><button class='btn btn-outline-info btnVerRespuesa' data-bs-toggle='modal' data-bs-target='#modalVerRespuestas'>Ver Respuestas</button></div></div>";
        fetch(url+idcuestionarios,{
            method:'get',
            mode:'cors',
            headers:{
                'Content-Type':'application/json',
                'authorization':token
                }})
            .then(response=>response.json())
            .then(res=>res.map(element=>tablaCuestionarios.row.add([element.idpreguntas,element.descripcion,element.categoria,defaultContent]).draw()))
            .catch(err=>console.log(err));
            }
            mostrarPreguntas();
        mostrarCuestionarios();

     //asignar respuestas a una pregunta del cuestionario
     $(document).on('click','.btnAnadirRespuesa',function(e){
        let fila=e.target.parentNode.parentNode.parentNode.parentNode;
        idpreguntas=parseInt(fila.children[0].innerHTML,10);
        document.getElementById("mostrarRespuesta").innerHTML='';
        document.getElementById('respuesta').value='';
        $(".modal-header").css("background-color", "#23272b");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Asignar Pregunta");
        $('#modalAsignar').modal('show');  
   
     })   

    //ASIGNAR PREGUNTAS
    $("#btnAsignar").click(function () {
       
        opcion = 'asignar';
        idpreguntas = null;
        $("#formCuestionario").trigger("reset");
        $(".modal-header").css("background-color", "#23272b");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Asignar Pregunta");
        $('#modalCRUD2').modal('show');  
    });

    document.getElementById('anidarRespuesta').onclick=()=>{
        let i=1;
        document.getElementById("mostrarRespuesta").innerHTML='';
        if(document.getElementById('respuesta').value){
            respuesta.push(document.getElementById('respuesta').value)
            respuesta.map(element=>{
                document.getElementById("mostrarRespuesta").innerHTML+=`${i}-${element} <br>`
                i++    
        })
        }else{
            alert("Ingrese un elemento");
        }
        
     
    }
  document.getElementById('btnGuardarRespuesta').onclick=()=>{
      
      fetch('http://localhost:3000/api/respuestas',{
          method:'post',
          mode:'cors',
          headers:{
            'Content-Type':'application/json',
            'authorization':token
          },
          body:JSON.stringify({respuesta:respuesta,idpreguntas:idpreguntas,idcuestionarios:parseInt(sessionStorage.getItem("idcuestionarios"),10)})
      })
      .then(response=>Swal.fire({title:'Respuestas guardadas',
      icon:'success',
      text:'',
      showConfirmButton:false,
      timer:1500}))
      .catch(err=>console.log(`ocurrio un error en: ${err}`))
      $('#modalAsignar').hide();
  }

    $(document).on('click','.btnAsignar',function(){
        fila = $(this).closest("tr");  
        idpreguntas = parseInt(fila.find('td:eq(0)').text());  
        //asignamos la pregunta a x cuestionario
        if (opcion == 'asignar') {
            fetch(urlAsignar+idpreguntas,{
                method:'post',
                mode:'cors',
                headers:{
                    'Content-Type':'application/json',
                    'authorization':token
                },
                body:JSON.stringify({idcuestionarios:idcuestionarios})
            })
            .then(response=>response.json())
            .then(data=>{
                Swal.fire(data)
               mostrarPreguntas();
               mostrarCuestionarios();
            })
            .catch(err=>console.log(err))
        }
    })
    //BORRAR PREGUNTAS
    $(document).on("click", ".btnBorrar", function () {
        fila = $(this);

        let idpreguntas = parseInt($(this).closest('tr').find('td:eq(0)').text(),10);
       
      
       Swal.fire({
            title: '¿Quiere desasignar del cuestionario?',
            showCancelButton: true,
            confirmButtonText: `Confirmar`,
        }).then((result) => {
            if (result.isConfirmed) {
                fetch('http://localhost:3000/api/desasignarPreguntas/',{
                    method:'delete',
                    mode:'cors',
                    headers:{
                        'Content-Type':'application/json',
                        'authorization':token,
                        'idpreguntas':idpreguntas,
                        'idcuestionarios':idcuestionarios
                    },
                })
                .then(response=>{
                    Swal.fire('¡Pregunta Desasignada!', '', 'success')
                    mostrarCuestionarios();
                    mostrarPreguntas();
                })
               .catch(err=>console.log(err))
            }
        })
    });

                   
});