import { personasServices } from "./persona-service.js";

const crearNuevaLinea = ({ nombre, apellido, edad, id, especialidad, telefono }) => {
    const nuevoElemento = document.createElement("li");
    const contenido = `
        <div class="encabezado__persona" id=${id}>
            <h3 class="persona__titulo">${nombre} ${apellido} </h3>
        <svg class="delete-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" id=${id}>
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
            </svg>
        </div>
                    <table class="tabla__lista" id="table${id}">
                        <tbody data-person class="datos__persona">
                            <tr>
                                <th class="column__campo">Nombre:</th>
                                <th class="column__valor">${nombre}</th>
                            </tr>
                            <tr>
                                <th class="column__campo">Apellido:</th>
                                <th class="column__valor">${apellido}</th>
                            </tr>
                            <tr>
                                <th class="column__campo">Identificación:</th>
                                <th class="column__valor">${id}</th>
                            </tr> 
                            <tr>
                                <th class="column__campo">Edad:</th>
                                <th class="column__valor">${edad} años</th>
                            </tr>
                            <tr>
                                <th class="column__campo">Teléfono:</th>
                                <th class="column__valor">${telefono}</th>
                            </tr>
                            <tr>
                                <th class="column__campo">Especialidad:</th>
                                <th class="column__valor">${especialidad}</th>
                            </tr>                                                                                                                                     
                        </tbody>
                    </table>
                </li>
    `;
    nuevoElemento.innerHTML = contenido;

    const btn = nuevoElemento.querySelector("svg");            

    btn.addEventListener("click", () => {
        const iden = btn.id;
        personasServices.listaClientes().then((data) =>{
            data.map(({id}) => {if(id === iden){                
                personasServices.eliminarPersona(id).then(() =>{                    
                }).catch((err) => alert("Error en el borrado."));
            }});
        }).catch((err)=> alert("Ocurrió un error.")); 
    });
    return nuevoElemento;
};

const listax = document.querySelector("[lista-persona]");

personasServices
    .listaClientes()
    .then((data) => {
        data.forEach((persona) => {
            const nuevaLinea = crearNuevaLinea(persona);
            listax.appendChild(nuevaLinea);
        });
    })
    .catch((error) => alert("Ocurrió un error"));