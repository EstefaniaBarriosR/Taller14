import mysql from 'mysql'

const conector = mysql.createConnection(
    {
        host: 'localhost',
        user: 'Estefania',
        password: '123456789',
        database: 'consultorio'
    }
)

const conectar = () => {
    conector.connect(e =>{
        if(e){throw e}
        else{console.log('conectado')}
    })
}

const agregarPaciente = (nombre,apellido) => {
    const sql = `INSERT INTO agenda (Nombre, Apellido, Id, Telefono, Edad, Especialidad) VALUES ("${nombre}", "${apellido}", "${null}", "${null}", "${null}", "${null}")`
    conector.query(sql, function(e, result, filed){
        if(e){throw e}
        else{console.log(result)}
    })
}

export {conectar, agregarPaciente}
