const listaClientes = () =>
  fetch("http://localhost:3000/personas").then((respuesta) => respuesta.json());

const crearPersona = (persona) => {
  return fetch("http://localhost:3000/personas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(persona),
  });
};

const eliminarPersona = (id) => {
  return fetch(`http://localhost:3000/personas/${id}`, {
    method: "DELETE",
  });
};

export const personasServices = {
  listaClientes,    
  crearPersona,
  eliminarPersona
};