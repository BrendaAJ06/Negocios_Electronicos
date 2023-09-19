let listaProductos = [];

const objProducto = {
    id: '',
    nombre: '',
    descripcion: ''
}

let editando = false;

const formulario = document.querySelector('#formulario');
const idInput = document.querySelector('#id');
const nombreInput = document.querySelector('#nombre');
const descripcionInput = document.querySelector('#descripcion');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(idInput.value === '' || nombreInput.value === '' || descripcionInput.value === '') {
        alert('Todos los campos se deben llenar');
        return;
    }

    if(editando) {
        editarProducto();
        editando = false;
    } else {
        objProducto.id = idInput.value;
        objProducto.nombre = nombreInput.value;
        objProducto.descripcion = descripcionInput.value;

        agregarProducto();
    }
}

function agregarProducto() {

    listaProductos.push({...objProducto});

    mostrarProductos();

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {
    objProducto.id = '';
    objProducto.nombre = '';
    objProducto.descripcion = '';
}

function mostrarProductos() {
    limpiarHTML();

    const divProductos = document.querySelector('.div-productos');
    
    listaProductos.forEach(producto => {
        const {id, nombre, descripcion} = producto;

        const parrafo = document.createElement('p');
        parrafo.textContent = `ID: ${id} - Nombre: ${nombre} - Descripción: ${descripcion} - `;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarProducto(producto);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarProducto(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divProductos.appendChild(parrafo);
        divProductos.appendChild(hr);
    });
}

function cargarProducto(producto) {
    const {id, nombre, descripcion} = producto;

    idInput.value = id;
    nombreInput.value = nombre;
    descripcionInput.value = descripcion;

    objProducto.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    
    editando = true;
}

function editarProducto() {

    objProducto.nombre = nombreInput.value;
    objProducto.descripcion = descripcionInput.value;

    listaProductos.map(producto => {

        if(producto.id === objProducto.id) {
            producto.id = objProducto.id;
            producto.nombre = objProducto.nombre;
            producto.descripcion = objProducto.descripcion;

        }

    });

    limpiarHTML();
    mostrarProductos();
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    
    editando = false;
}

function eliminarProducto(id) {

    listaProductos = listaProductos.filter(producto => producto.id !== id);

    limpiarHTML();
    mostrarProductos();
}

function limpiarHTML() {
    const divProductos = document.querySelector('.div-productos');
    while(divProductos.firstChild) {
        divProductos.removeChild(divProductos.firstChild);
    }
}
