//login
var provider = new firebase.auth.GoogleAuthProvider();
const login=document.getElementById('login');
const logout=document.getElementById('logout');
const formLogin=document.getElementById('send');
const formRegister=document.getElementById('register');


if(login){
    login.onclick=async function(){
        firebase.auth()
        .signInWithPopup(provider)
        .then(result=>{

           // console.log(result.user.displayName);
           var nombre=result.user.displayName;
           sessionStorage.setItem("usuario",nombre);
           //window.location.replace('./html/presentacion.html');
            //result.user.uid
            //result.user.displayName
            let {displayName,uid}=result.user;
            const data={
                displayName:displayName,
                uid:uid
            };
             fetch('https://localhost:3000/api/loginG',{
                method:'post',
                mode:'cors',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            })
            .then(response=>response.json())
            .then(res=>{   
            Swal.fire({icon:res.icon,text:res.text,title:res.title,showConfirmButton:res.showConfirmButton,timer:res.timer}).then(()=>{
                sessionStorage.setItem('usuario',res.user);
                sessionStorage.setItem('idUser',res.idUser);
                sessionStorage.setItem('token',res.token);
                window.location.replace('https://localhost:3000/html/presentacion.html');
            });
            })
            .catch(err=>console.log("ocurrio un error:"+err));

        });
    }
}

if(logout){
    logout.onclick=function(){
        firebase.auth()
        .signOut()
        .then(err=>{
            if(err)console.log(err);
            Swal.fire({
                title: '¿Quiere cerrar sesion?',
                showCancelButton: true,
                confirmButtonText: `Confirmar`,
            }).then((result) => {
                if (result.isConfirmed) {
                    //el usuario se elimina
                    sessionStorage.setItem('usuario',null);
                    //el token se elimina
                    sessionStorage.setItem('token',null);
                   window.location.replace('https://localhost:3000/')
                
                };  
            })
            
            
        })
        .catch(err=>{
            if(err)console.log(err);
        })
    }
}

if(formLogin){
   formLogin.addEventListener('submit',  event=>{
       event.preventDefault();
       const data={
           user:document.getElementById('user').value,
           password:document.getElementById('password').value
       }
       fetch('https://localhost:3000/api/login',{
           method:'Post',
           mode:'cors',
           headers:{
               'Content-Type':'application/json'
           },
           body:JSON.stringify(data)
       })
       .then(response=>response.json())
       .then(datas=>{
        if(datas.success){
            sessionStorage.setItem('usuario',datas.user);
            sessionStorage.setItem('idUser',datas.idUser);
            sessionStorage.setItem('token',datas.token);
            Swal.fire({icon:datas.icon,title:datas.title,text:datas.text,showConfirmButton:datas.showConfirmButton,timer:datas.timer})
           .then(event=>window.location.replace("https://localhost:3000/html/presentacion.html"))
        }
        else{
            Swal.fire({icon:datas.icon,title:datas.title,text:datas.text,showConfirmButton:data.showConfirmButton,timer:datas.timer})
        }
       })
        .catch(err=>console.log(err))
   })
}

