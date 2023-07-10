const nombre = document.querySelector('#nombre')
const apellido = document.querySelector('#apellido')
const btnAgregar = document.querySelector('#btn_agregar')

btnAgregar.addEventListener('click', function(){
    console.log('funciona')
    window.location.href = `agregar/${nombre.value}/${apellido.value}`

})
