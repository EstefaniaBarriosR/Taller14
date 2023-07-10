import { personasServices } from "./persona-service.js";

const formulario = document.querySelector("[data-form]");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    
    //variables
    const nombre = document.querySelector("[data-nombre]").value;
    const apellido = document.querySelector("[data-apellido]").value;
    const id = document.querySelector("[data-id]").value;
    const telefono = document.querySelector("[data-telefono]").value;
    const edad = document.querySelector("[data-edad]").value;
    const especialidad = document.querySelector("[data-especialidad]").value;

    const persona = {
        nombre,
        apellido,
        id,
        telefono,
        edad,
        especialidad
    }

    if(Validacion(nombre,apellido,id,telefono,edad,especialidad)){
        personasServices
        .listaClientes()
        .then((data) => {
            if(verificarPersona(data, id)){
                personasServices.crearPersona(persona).then(() =>{    
                    window.location.href = "../pages/registro_completo.html"                
                }).catch((e) => console.log(e));
            }else{
                alert("Ya se encuentra registrado un cliente con esa Identificación");
            }
        })
        .catch((e) => console.log(e));
    }
});

const Validacion = (Nombre, Apellido, Id, Telefono, Edad, Especialidad) => {
    var flag = false;

    // expresiones regulares
    const expText =  /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/; 
    const expId = /^([0-9]{5,10})*$/;
    const expTelefono = /^([0-9]{7,10})*$/;
    const expEdad = /^[0-9]{1,3}$/;

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
    else if(Telefono == "" || Telefono == 0 || !expTelefono.test(Telefono)){
        alert("Telefono invalido")
        //alertify.error('El campo telefono es invalido');
        document.getElementById("input-nombre").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-apellido").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-id").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-telefono").style.boxShadow = "0 0 5px red";
    }
    else if(Edad == "" || Edad == 0 || !expEdad.test(Edad)){
        alert("Edad invalida")
        //alertify.error('El campo edad es invalido');
        document.getElementById("input-nombre").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-apellido").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-id").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-telefono").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-edad").style.boxShadow = "0 0 5px red";
    }
    else if(Especialidad == "" || !expText.test(Especialidad)){
        alert("Debes seleccionar una especialidad")
        //alertify.error('El campo especialidad es invalido');
        document.getElementById("input-nombre").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-apellido").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-id").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-telefono").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-edad").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-especialidad").style.boxShadow = "0 0 5px red";
    }
    else{
        flag = true; 
        
    }
    return flag;
}

const verificarPersona = (data, ident) => {
    var bandera = true;    
    const UsuarioNuevo = data.map(({id}) => {        
        if(ident === id){
            bandera = false;            
        }        
    });    
    return bandera;    
} 