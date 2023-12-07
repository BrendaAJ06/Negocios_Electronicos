
const openModal = document.getElementById('openRegisterModal')
const modal = document.getElementById('modal')
const modal2 = document.getElementById('modal2')
const closeModal = document.getElementById('closeRegisterModal')
const closeModal2 = document.getElementById('closeRegisterModal2')

const agregarProducto = document.getElementById('agregarProducto')
const editarProducto = document.getElementById('editarProducto')

const inputNombre = document.getElementById('formnombre')
const inputmarca = document.getElementById('formmarca')
const inputprecio = document.getElementById('formprecio')
const inputdescort = document.getElementById('formdescorta')
const inputdeslarg = document.getElementById('formdeslarga')
const inputfoto = document.getElementById('formfoto')
const inputlink = document.getElementById('formlink')



const inputNombre2 = document.getElementById('formnombre2')
const inputmarca2 = document.getElementById('formmarca2')
const inputprecio2 = document.getElementById('formprecio2')
const inputdescort2 = document.getElementById('formdescorta2')
const inputdeslarg2 = document.getElementById('formdeslarga2')
const inputfoto2 = document.getElementById('formfoto2')
const inputlink2 = document.getElementById('formlink2')



const showRegisterModal = () => {
    modal.classList.toggle('is-active')
}

const showRegisterModal2 = () => {
    modal2.classList.toggle('is-active')
}

const tabla = document.getElementById('productos')
let datos;
let indexEditado;
function Func() {
    fetch("js/productos.json")
        .then((res) => {
        return res.json();
    })
    .then((data) => {console.log(data)
        datos = data;
        render(data);
    })
}


const render = (data) => {

    tabla.innerHTML = "";
    let index = 0;
    data.forEach(element => {

        let row = tabla.insertRow(-1)
        let c1 = row.insertCell(0)
        let c2 = row.insertCell(1)
        let c3 = row.insertCell(2)
        let c4 = row.insertCell(3)
        let c5 = row.insertCell(4)
        let c6 = row.insertCell(5)
        let c7 = row.insertCell(6)
        let c8 = row.insertCell(7)
        let c9 = row.insertCell(8)

        c1.innerText = element.name;
        c2.innerText = element.marca;
        c3.innerText = element.precio;
        c4.innerText = element.descCorta;
        c5.innerText = element.descLarga;
        c6.innerText = element.foto;
        c7.innerText = element.link;
        c8.innerHTML = `<button type="button" data-index='${index}' onclick="indexAEditar(${index})">Editar</button>`;
        c9.innerHTML = `<button type="button" data-index='${index}' onclick="borrarFila(${index})">Eliminar</button>`;
        index++;
    });

}

const agregarProductoFunction = () => {
    console.log('test')

    //AGREGAR LOS DATOS FALTANTES
    let test = {
        "id": "0",
        "name": inputNombre.value,
        "marca": inputmarca.value,
        "foto": inputfoto.value,
        "precio": inputprecio.value,
        "descCorta": inputdescort.value,
        "descLarga": inputdeslarg.value,
        "link": inputlink.value
    };

    datos.push(test)
    render(datos);
}

const borrarFila = (index) => {
    console.log('borrar', index)

    datos.splice(index,1)
    render(datos);
}

const editarFila = () => {
    console.log(indexEditado)
    //AGREGAR LOS DATOS FALTANTES
    datos[indexEditado].name = inputNombre2.value;
    datos[indexEditado].marca = inputmarca2.value; 
    datos[indexEditado].precio = inputprecio2.value;
    datos[indexEditado].descCorta = inputdescort2.value;
    datos[indexEditado].descLarga = inputdeslarg2.value;
    datos[indexEditado].foto = inputfoto2.value;
    datos[indexEditado].link = inputlink2.value;


    render(datos);
}

const indexAEditar = (index) => {
    indexEditado = index;

    inputNombre2.value = datos[index].name;
    inputmarca2.value = datos[index].marca;
    inputprecio2.value = datos[index].precio;
    inputdescort2.value = datos[index].descCorta;
    inputdeslarg2.value = datos[index].descLarga;
    inputfoto2.value = datos[index].foto;
    inputlink2.value = datos[index].link;

    modal2.classList.toggle('is-active')
}

agregarProducto.addEventListener('click',agregarProductoFunction);
editarProducto.addEventListener('click',editarFila);
openModal.addEventListener('click',showRegisterModal)
closeModal.addEventListener('click',showRegisterModal)
closeModal2.addEventListener('click',showRegisterModal2)

Func();