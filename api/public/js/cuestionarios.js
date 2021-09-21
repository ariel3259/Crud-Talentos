
    $(document).ready(function() {   
        //url de la api
        let url = 'http://localhost:3000/api/cuestionarios/';
        let opcion = null;
        //campos de la api
        const token=sessionStorage.getItem('token');
        let id,usuario,descripcion;  
        //mostramos el nombre del usuario
            document.getElementById("mostrarNombre").innerHTML+=sessionStorage.getItem("usuarioCreador");
        //MOSTRAR
       let tablaCuestionarios=$('#tablaCuestionarios').DataTable({'language':{"url": "http://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"}});
    
            //La funcion mostrar limpia la tabla cuestionarios y  la llena con los cuestionarios guardados en la base de datos 
       function mostrar(){
           tablaCuestionarios.clear().draw();
           //defaultContent son los botones que se existen en  el campo de acciones
           let defaultContent="<div class='text-center'> <div class='btn-group'> <button  class='btn btn-outline-primary  btnVer'>Ver</button> <button class='btn btn-outline-info btn-sm btnEditar'>Editar</button> <button class='btn btn-outline-danger btnBorrar'>Borrar</button><button class='btn btn-outline-info  btnClonar'>Clonar</button><button type='button' class='btn btn-outline-info btnEncuestas'>Encuestas</button><button type='buton' class='btn btn-outline-info btnEncuestasRespondidas'>Encuestas Respondidas</div></div>";
           let content="<div class='text-center'> <div class='btn-group'> <button class='btn btn-outline-info  btnClonar'>Clonar</button></div></div>";
           if(token!="null"){
            fetch(url,{
                method:"get",
                mode:'cors',
                headers:{
                    'Content-Type':'application/json',
                    'authorization':token
                }
            })
            .then(response=>response.json())
            .then(res=>res.map(element=>sessionStorage.getItem("usuarioCreador")===element.usuarioCreador?tablaCuestionarios.row.add([element.idcuestionarios,element.fechaCreacion,element.usuarioCreador,element.descripcion,element.estado,defaultContent]).draw():tablaCuestionarios.row.add([element.idcuestionarios,element.fechaCreacion,element.usuarioCreador,element.descripcion,element.estado,content]).draw()))
            .catch(err=>console.log(err));
           }else{
            Swal.fire({icon:'error',title:'Inicie sesion primero',showConfirmButton:false,timer:1200}).then(()=>{
                  //el usuario se elimina
                  sessionStorage.setItem('usuario',null);
                  //el token se elimina
                  sessionStorage.setItem('token',null);
                window.location.replace('http://localhost:3000/')})
           }  
    }
    mostrar();


        //CREAR
        $("#btnCrear").click(function(){
            opcion='crear';            
            id=null;
            $("#formArticulos").trigger("reset");
            $(".modal-header").css( "background-color", "#23272b");
            $(".modal-header").css( "color", "white" );
            $(".modal-title").text("Crear cuestionario");
            $('#modalCRUD').modal('show');	 
            $("#estado").prop("checked", true);  
        });  
    
        //EDITAR        
        $(document).on("click", ".btnEditar", function(){		            
            opcion='editar';
            fila = $(this).closest("tr");	        
            id = parseInt(fila.find('td:eq(0)').text());
           // fecha = fila.find('td:eq(1)').text();
            usuario = fila.find('td:eq(2)').text();
            descripcion = fila.find('td:eq(3)').text();   
            estado = fila.find('td:eq(4)').text();        
            $("#id").val(id);
            //$("#fecha").val(fecha);
            $("#usuario").val(usuario);
            $("#descripcion").val(descripcion);
            $("#estado").val(estado);           
            $(".modal-header").css("background-color", "#7303c0");
            $(".modal-header").css("color", "white" );
            $(".modal-title").text("Editar cuestionario");		
            $('#modalCRUD').modal('show');	
                   
        });
    
        //VER
        $(document).on("click",".btnVer",function(){
            let fila2=$(this).closest("tr");
          //cuestionario almacena idcuestionario y lo guardamos con un metodo del objeto sessionStorage
            let cuestionario_=parseInt(fila2.find('td:eq(0)').text());
                console.log(cuestionario_);
            //enviamos la variable id2, que almacena el id de un cuestionario a una   llave  con el metodo del objeto sessionStorage
                sessionStorage.setItem("idcuestionario",cuestionario_);
            let titulo_cuestionario=fila2.find('td:eq(3)').text();
            sessionStorage.setItem("titulo",titulo_cuestionario);
            window.location.replace('http://localhost:3000/html/preguntascuestionario.html');
        });
    
        //ENCUESTAS
        $(document).on('click','.btnEncuestas',function(){
            let fila2=$(this).closest("tr");
            //cuestionario almacena idcuestionario y lo guardamos con un metodo del objeto sessionStorage
              let cuestionario_=parseInt(fila2.find('td:eq(0)').text());
                  console.log(cuestionario_);
              //enviamos la variable id2, que almacena el id de un cuestionario a una   llave  con el metodo del objeto sessionStorage
                  sessionStorage.setItem("idcuestionario",cuestionario_);
              let titulo_cuestionario=fila2.find('td:eq(3)').text();
              sessionStorage.setItem("titulo",titulo_cuestionario);
            window.location.replace('http://localhost:3000/html/encuestas.html');
        });

        //ENCUESTAS RESPONDIDAS
        $(document).on('click','.btnEncuestasRespondidas',function(){
            let fila2=$(this).closest("tr");
            //cuestionario almacena idcuestionario y lo guardamos con un metodo del objeto sessionStorage
              let cuestionario_=parseInt(fila2.find('td:eq(0)').text());
                  console.log(cuestionario_);
              //enviamos la variable id2, que almacena el id de un cuestionario a una   llave  con el metodo del objeto sessionStorage
                  sessionStorage.setItem("idcuestionario",cuestionario_);
              let titulo_cuestionario=fila2.find('td:eq(3)').text();
              sessionStorage.setItem("titulo",titulo_cuestionario);
            window.location.replace('http://localhost:3000/html/encuestasRespondidas.html');
        })
        //CLONAR
        $(document).on("click",".btnClonar",function(e){
            e.preventDefault();
            let fila2=$(this).closest("tr");
         
         const data=   {  
              id:fila2.find('td:eq(0)').text(),
         descripcion: fila2.find('td:eq(3)').text(),  
         estado:fila2.find('td:eq(4)').text(),      
        usuario: sessionStorage.getItem("usuarioCreador")
    }
        fetch(url,{
            method:'post',
            mode:'cors',
            headers:{
                'Content-Type':'application/json',
                'authorization':token
            },
            body:JSON.stringify(data)
        })
            .then(response=> Swal.fire("Cuestionario Clonado").then(()=>mostrar()))
            .catch(err=>console.log(err))
        })
    
    
         //BORRAR
        $(document).on("click", ".btnBorrar", function(){
            fila = $(this);           
            id = parseInt($(this).closest('tr').find('td:eq(0)').text());            
            Swal.fire({
                title: '¿Confirma eliminar el cuestionario?',                
                showCancelButton: true,
                confirmButtonText: `Confirmar`,                
                }).then((result) => {               
                if (result.isConfirmed) {
                    fetch(url+id,{
                        method:'Delete',
                        mode:'cors',
                        headers:{
                            'Content-Type':'application.json',
                             'authorization':token
                        }
                    })
                    .then(response=>response.json())
                    .then(data=>Swal.fire({icon:data.icon,title:data.title}).then(()=>mostrar()))
                    .catch(err=>console.log(err))
                } 
                })
        });   
    
        //submit para el CREAR y EDITAR
        $('#formArticulos').submit(function(e){                                     
            e.preventDefault();
            id = $.trim($('#id').val());    

            const data={
            usuario: sessionStorage.getItem("usuarioCreador"),  
            descripcion:document.getElementById("descripcion").value,
            estado : document.getElementById("estado").checked
            }
            if(opcion=='crear'){ 
                fetch(url,{
                    method:'post',
                    mode:'cors',
                    headers:{
                        'Content-Type':'application/json',
                        'authorization':token
                    },
                    body:JSON.stringify(data)
                })
                .then(result=>mostrar())
                .catch(err=>console.log(err))
            }
             
            
            if(opcion=='editar'){
                fetch(url+id,{
                    method:'put',
                    mode:'cors',
                    headers:{
                        'Content-Type':'application/json',
                        'authorization':token
                    },
                    body:JSON.stringify(data)
                })
                .then(result=>mostrar())
                .catch(err=>console.log(err))

            }   
                                
            $('#modalCRUD').modal('hide');											     			
        });
    
    });

