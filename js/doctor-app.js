import { doctoresServices } from "./doctor-service.js";

const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    
    //variables
    const nombre = document.querySelector("[data-nombre]").value;
    const apellido = document.querySelector("[data-apellido]").value;
    const id = document.querySelector("[data-id]").value;
    const especialidad = document.querySelector("[data-especialidad]").value;
    const consultorio = document.querySelector("[data-consultorio]").value;
    const correo = document.querySelector("[data-correo]").value;

    const doctor = {
        nombre,
        apellido,
        id,
        especialidad,
        consultorio,
        correo
    }

    if(Validacion(nombre,apellido,id,especialidad,consultorio,correo)){
        doctoresServices
        .listaDoctores()
        .then((data) => {
            if(verificarDoctor(data, id)){
                doctoresServices.crearDoctor(doctor).then(() =>{    
                    window.location.href = "../pages/registro_completo.html"                
                }).catch((e) => console.log(e));
            }else{
                alert("Ya se encuentra registrado un doctor con esa Identificación");
            }
        })
        .catch((e) => console.log(e));
    }
});

const Validacion = (Nombre, Apellido, Id, Especialidad, Consultorio, Correo) => {
    var flag = false;

    // expresiones regulares
    const expText =  /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/; 
    const expId = /^([0-9]{5,10})*$/;
    const expConsultorio = /^[0-9]{3}$/;
    const expCorreo= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    // validaciones

    if(Nombre == "" || !expText.test(Nombre)){
        alert("Nombre invalido")
        //alertify.error('El campo nombre es invalido');
        document.getElementById("input-nombre").style.boxShadow = "0 0 3px red";
    }
    else if(Apellido == "" || !expText.test(Apellido)){
        alert("Apellido invalido")
        //alertify.error('El campo apellido es invalido');
        document.getElementById("input-nombre").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-apellido").style.boxShadow = "0 0 3px red";
        
    }
    else if(Id == "" || Id == 0 || !expId.test(Id)){
        alert("Cedula invalida")
        //alertify.error('El campo cedula es invalido');
        document.getElementById("input-nombre").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-apellido").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-id").style.boxShadow = "0 0 5px red";
    }
    else if(Especialidad == "" || !expText.test(Especialidad)){
        alert("Debes seleccionar una especialidad")
        //alertify.error('El campo especialidad es invalido');
        document.getElementById("input-nombre").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-apellido").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-id").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-especialidad").style.boxShadow = "0 0 5px red";
    }
    else if(Consultorio == "" || Consultorio == 0 || !expConsultorio.test(Consultorio)){
        alert("Consultorio invalido")
        //alertify.error('El campo consultorio es invalido');
        document.getElementById("input-nombre").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-apellido").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-id").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-especialidad").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-consultorio").style.boxShadow = "0 0 5px red";
    }
    else if(Correo == "" || Correo == 0 || !expCorreo.test(Correo)){
        alert("Correo invalido")
        //alertify.error('El campo correo es invalido');
        document.getElementById("input-nombre").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-apellido").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-id").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-especialidad").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-consultorio").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-correo").style.boxShadow = "0 0 5px red";
    }
    else{
        flag = true; 
        
    }
    return flag;
}

const verificarDoctor = (data, ident) => {
    var bandera = true;    
    const DoctorNuevo = data.map(({id}) => {        
        if(ident === id){
            bandera = false;            
        }        
    });    
    return bandera;    
} 