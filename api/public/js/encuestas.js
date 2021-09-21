
$(document).ready(function(){
    let destinatarios=[];

    let tablaEncuestas=$('#tablaEncuestas').DataTable({'language':{"url": "http://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"}});
    document.getElementById('user').innerHTML=sessionStorage.getItem('usuarioCreador');

    //Este evento agrega un destinatario al arreglo destinatario
    document.getElementById('agregarDestinatario').onclick=()=>{
        let i=1;
        alert("funciona")
        document.querySelector('#mostrarDestinatario').innerHTML='<option value="default">Mostrar destinatarios</option>';
        destinatarios.push(document.getElementById('destinatario').value);
        destinatarios.map(element=>{
            document.getElementById('mostrarDestinatario').innerHTML+=`<option>${i}-${element}</option>`;
            i++
        });
    }

$(document).on('click','.btnEliminar',function(){
    Swal.fire({
        title:'Encuesta borrada',
        icon:'success',
        showConfirmButton:false,
        timer:1500
    });
})
$(document).on('click','.btnCerrar',function(){
    Swal.fire({
        title:'Encuesta cerrada',
        icon:'success',
        showConfirmButton:false,
        timer:1500
    })
});

document.getElementById('editarEncuesta').onclick=()=>{
    let destinatario=document.getElementById('destinatario').value;
    let estado=document.getElementById('estado').checked?1:0;
    console.log(destinatario);
    console.log(estado);
}

});