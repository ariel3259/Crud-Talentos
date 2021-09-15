

$(document).ready(function () {
    let url = 'http://localhost:3000/api/cuestionarios/preguntas/';
    let urlPreguntas = 'http://localhost:3000/api/preguntas/mostrarPreguntasHabilitadas/';
    let urlAsignar = 'http://localhost:3000/api/cuestionarios/asignarPregunta/';
    let opcion = null;
    const token=sessionStorage.getItem('token');
    let idpreguntas, idcuestionarios;
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
        let defaultContent="<div class='text-center'><div class='btn-group'><button class='btn btn-info btn-sm btnAsignar'>Asignar al cuestionario</button></div></div>";
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
    }
    //mostrar Preguntas del Cuestionario
    function mostrarCuestionarios(){
        tablaCuestionarios.clear().draw();
        let defaultContent="<div class='text-center'><div class='btn-group'><button class='btn btn-danger btn-sm btnBorrar'>Desasignar</button></div></div>";
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