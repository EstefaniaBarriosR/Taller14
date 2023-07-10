import express from 'express' //Importamos Express
import {conectar, agregarPaciente} from './js/mysql_conector.js'

const app = express() //Iniciamos Express

//Iniciamos el servidor
app.listen('8000', function(){
    console.log('api iniciada en el puerto 8000')
})

//Conf Pug
app.set('views', './vistas')
app.set('view engine', 'pug')

//Conf archivos estaticos
app.use(express.static('./vistas'))
app.use(express.static('./js'))
app.use(express.static('./styles'))

app.get('/', function(req, res){
    //res.send('api iniciada todo va bien')
    //conectar()
    res.render('index', {titulo:'Aplicacion de contactos', dato: 'cualquier texto'})
})

app.get('/agregar/:nombre/:apellido', function(req, res){
    let nombre = req.params.nombre
    let apellido = req.params.apellido
    agregarPaciente(nombre,apellido)
    res.redirect('/')
    //console.log(nombre,apellido)
})