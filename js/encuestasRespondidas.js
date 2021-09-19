$(document).ready(function(){
    $('#encuestasRespondidas').DataTable({'language':{"url": "http://cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"}});
    document.getElementById('user').innerHTML=sessionStorage.getItem("usuarioCreador");
})
