const listaDoctores = () =>
  fetch("http://localhost:3000/doctores").then((respuesta) => respuesta.json());

const crearDoctor = (doctor) => {
  return fetch("http://localhost:3000/doctores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(doctor),
  });
};

const eliminarDoctor = (id) => {
  return fetch(`http://localhost:3000/doctores/${id}`, {
    method: "DELETE",
  });
};

export const doctoresServices = {
  listaDoctores,    
  crearDoctor,
  eliminarDoctor
};