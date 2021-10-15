let pagina = 1;
const cita = {
    nombre:'',
    apellido:'',
    telefono:'',
    email:'',
    fecha:'',
    hora:'',
    servicios:[]
}

document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});



function iniciarApp(){
    mostrarServicios();

    // Resaltar el div Actual segun el tab al que se precione
    mostrarSeccion();


    //Ocultar o mostar  una seccion el tab al que se prsione

    cambiarSeccion();

    //paginacion siguiente y anterior
    paginaSiguiente();


    paginaAnterior();


    // //comprobar la pagina actual

    botonesPaginador();

    //muestra el resumen de la cita en caso de no pasar la validacion.
    mostrarResumen();

}

function mostrarSeccion(){

    //Eliminar 'mostrar-seccion' de la seccion anterior
    const seccionAnterior = document.querySelector('.mostrar-seccion');
    if( seccionAnterior ){
        seccionAnterior.classList.remove('mostrar-seccion');
    }

    //agrego 'mostrar-seccion' a la seccion actual de la nueva pagina
    const seccionActual = document.querySelector(`#paso-${pagina}`);
    seccionActual.classList.add('mostrar-seccion');

     // //elimina la clase de actual en el tab actual
    const tabAnterior = document.querySelector('.tabs .actual');
    if (tabAnterior) {
        tabAnterior.classList.remove('actual');
    }


    //Resalta el tab actual //Seleccionar atributo

    const tab = document.querySelector(`[data-paso="${pagina}"]`);
    tab.classList.add('actual');
}

function cambiarSeccion(){
    const enlaces = document.querySelectorAll('.tabs button');

    enlaces.forEach( enlace => {
        enlace.addEventListener('click', e => {
            e.preventDefault();
            pagina = parseInt(e.target.dataset.paso);



            //Agrega mostrar-seccion donde dimos click
            // const seccion = document.querySelector(`#paso-${pagina}`);
            // seccion.classList.add('mostrar-seccion');

            // //Agrega la clase de actual en el nuevo tab
            // const tabActual = document.querySelector()
            // const tab = document.querySelector(`[data-paso="${pagina}"]`);
            // tab.classList.add('actual');

            //llamar  la funcion de mostrar seccion
            mostrarSeccion();

            botonesPaginador();

        })
    })
}


async function mostrarServicios(){
    try{
        const resultado = await fetch('./servicios.json');
        const db = await resultado.json();

        const { servicios } = db;


        //generar el HTML
        servicios.forEach( servicio => {

            const { id, nombre, precio } = servicio;

            //DDM Scripting
            //Generar nombre de servicio
            //agrego el nombre en la en el parrafo
            const nombreServicio = document.createElement('P');
            nombreServicio.textContent = nombre;
            //agrego clase
            nombreServicio.classList.add('nombre-servicios');

            //Generar Precio del Servicio en un parrafo "p"
            const precioServicio = document.createElement('P');
            //inyecto el precio con un temple string agregando
            //el signo
            precioServicio.textContent = `$ ${precio}`;
            //agrego clase
            precioServicio.classList.add('precio-servicio');

            // Generar div contenedor de servicio
            const servicioDiv = document.createElement('DIV');
            servicioDiv.classList.add('servicios');


            //seleccionar un servicio para la cita
            servicioDiv.onclick = seleccionarServicio;


            //inyectar precio y nombre al div
            servicioDiv.appendChild(nombreServicio);
            servicioDiv.appendChild(precioServicio);

            //inyectar en el HTML
            document.querySelector('#servicios').appendChild(servicioDiv);

        });

    } catch(error){
        console.log(error);
    }

}

function seleccionarServicio(e){

    let elemento;
     //forzarmos al elemento al cual le damos click a DIV
    if(e.target.tagName === 'P'){
        elemento = e.target.parentElement;

    } else {
        elemento = e.target;
    }

    // console.log(elemento.dataset.idServicio);

    // si doy click agrega la seleccionado y le vuelvo a dar lo deselaciosna
    if(elemento.classList.contains('seleccionado')){
        elemento.classList.remove('seleccionado');

        eliminarServicio();
    } else {
        elemento.classList.add('seleccionado');
        agregandoServicio();
    }

}

function eliminarServicio() {
    console.log('eliminando ...');
}
function agregandoServicio() {
    console.log('marisco el que lo...');
}


function paginaSiguiente(){
    const paginaSiguiente = document.querySelector('#siguiente');
    paginaSiguiente.addEventListener('click', () => {
        pagina++;

        // console.log(paginaSiguiente);

        botonesPaginador();
    });
}
function paginaAnterior(){
    const paginaAnterior = document.querySelector('#anterior');
    paginaAnterior.addEventListener('click', () => {
        pagina--;

        // console.log(paginaAnterior);

        botonesPaginador();
    });

}

function botonesPaginador(){
    const paginaSiguiente = document.querySelector('#siguiente');
    const paginaAnterior = document.querySelector('#anterior');

    if(pagina === 1){
        paginaAnterior.classList.add('ocultar');
        // paginaSiguiente.classList.remove('ocultar');
    } else if (pagina === 2) {
        paginaAnterior.classList.remove('ocultar');
        // paginaSiguiente.classList.remove('ocultar');
    }else if(pagina === 3){
        paginaSiguiente.classList.remove('ocultar');
        // paginaAnterior.classList.remove('ocultar');
    }else if (pagina === 4) {
        // paginaAnterior.classList.remove('ocultar');
        paginaSiguiente.classList.add('ocultar');
    }  //else {
    //     paginaAnterior.classList.add('ocultar');
    //     paginaSiguiente.classList.remove('ocultar');
    // }
    mostrarSeccion();
    //cambia la seccion que se muestra por la de la pagina
}

function mostrarResumen(){
    // destructuring
    const { nombre, apellido, telefono, email, fecha, hora, servicios} = cita;

    //seleccionar el resumen
    const resumenDiv = document.querySelector('.contenido-resumen');

    //validacion de objeto

    if(Object.values(cita).includes('')){
        const noServicios = document.createElement('P');
        noServicios.textContent = 'Faltan datos de servicios, nombre, hora o fecha';

        noServicios.classList.add('invalidar-cita');

        //agregra a resumen Div
        resumenDiv.appendChild(noServicios);
    }

}

// farta terminar validacion de correos 
