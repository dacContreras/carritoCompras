// VARIABLES
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


const cargarEventListeners = () => {
    listaCursos.addEventListener('click', agregarCurso);
    
    carrito.addEventListener('click', eliminarCurso);
    
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // reseteamos el arreglo
        limpiarHTML(); // eliminamos todo del html
    })
}

const agregarCurso = (e) => {
    e.preventDefault();
    
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

const eliminarCurso = (e) => {
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        
        //eliminar del arreglo de articulos carrito po rlel data id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        
        carritoHTML();
    }
}

const limpiarHTML = () => {
    // contenedorCarrito.innerHTML = '';
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}


//LEE EL CONTENDIO DEL HTL AL QUE LE DIMOS CLICK Y EXTRAE LA INFORMACION DEL CURSO
const leerDatosCurso = (curso) => {
    // console.log(curso);
    
    //crear un objeto con el curso del curso atual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }
    //revisa si un elemento ya existse en el carrito
    const existe = articulosCarrito.some(curso => curso.id == infoCurso.id)
    if(existe){
        // actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad ++;
                return curso; //retorna obejto actualizado
            } else {
                return curso; // retonrna los objenos que no son duplicaod
            }
        });
        articulosCarrito = [...cursos]
    } else{
        // agrega elemento al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    // console.log(articulosCarrito);
    
    carritoHTML();
}

//muestra el carrito de compras en el html
const carritoHTML = () => {
    //limpiar html
    limpiarHTML();
    //genera html
    articulosCarrito.forEach(curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${imagen}" width="100"></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><a href="#" class="borrar-curso" data-id="${id}"> X </a></td>
        `;
        
        // agrega el html del carrito en el html
        contenedorCarrito.appendChild(row);
    })
}


cargarEventListeners();