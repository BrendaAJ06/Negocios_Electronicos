console.log('correcto');
let datos;

document.querySelector('#buscar').addEventListener('click', function () {
    const filtro = document.getElementById('filtro').value;
    buscarProductos(filtro);
});

traerDatos();

function traerDatos() {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'productos.json', true);

    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            datos = JSON.parse(this.responseText);
            mostrarProductos(datos);
        }
    };
}

function mostrarProductos(productos) {
    let res = document.querySelector('#res');
    res.innerHTML = '';

    for (let producto of productos) {
        res.innerHTML += `
            <div class="col-md-4 text-center producto">
                <div class="card" style="margin: 10px;">
                    <h3 class="text-center text-primary text-dark">
                        ${producto.name}
                    </h3>
                    <a href="${producto.link}">
                        <img class="text-center" src="${producto.foto}" alt=""
                            style="height:150px; width: auto; position: relative; margin: auto;">
                    </a>
                    <h5 class="text-center text-dark">
                        ${producto.marca}
                    </h5>
                    <h5 class="text-center text-dark">
                        ${producto.descCorta}
                    </h5>
                    <h4 class="text-left text-dark">
                        ${producto.precio}
                    </h4>
                    <a href="${producto.link}" type="button" class="btn btn-success">
                        Ver Más
                    </a>
                </div>
            </div>
        `;
    }
}

function buscarProductos(filtro) {
    const productosFiltrados = datos.filter(producto =>
        producto.name.toLowerCase().includes(filtro.toLowerCase()) ||
        producto.marca.toLowerCase().includes(filtro.toLowerCase())
    );
    mostrarProductos(productosFiltrados);
}

function ordenarProductos() {
    const selector = document.getElementById('ordenar');
    const orden = selector.value;
    let productosOrdenados;

    if (orden === 'precioAlto') {
        productosOrdenados = datos.slice().sort((a, b) => b.precio - a.precio);
    } else if (orden === 'precioBajo') {
        productosOrdenados = datos.slice().sort((a, b) => a.precio - b.precio);
    } else {
        productosOrdenados = datos.slice();
    }

    mostrarProductos(productosOrdenados);
}

// Agregamos el event listener para el cambio en el menú desplegable
document.getElementById('ordenar').addEventListener('change', function () {
    ordenarProductos();
});
