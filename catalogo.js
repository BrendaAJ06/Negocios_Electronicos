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
        if (this.readyState == 4) {
            if (this.status == 200) {
                try {
                    datos = JSON.parse(this.responseText);
                    mostrarProductos(datos);
                } catch (error) {
                    console.error('Error al parsear JSON:', error);
                }
            } else {
                console.error('Error en la solicitud:', this.status);
            }
        }
    };
}

function mostrarProductos(productos) {
    let res = document.querySelector('#res');
    res.innerHTML = '';

    for (let producto of productos) {
        if (producto.name && producto.marca && producto.descCorta && producto.precio && producto.link && producto.foto) {
            res.innerHTML += `
                <div class="col-md-4 text-center producto">
                    <div class="card" style="margin: 10px;">
                        <h3 class="text-center text-primary text-dark">
                            ${producto.name}
                        </h3>
                        <a href="${producto.link}">
                            <img class="text-center" src="${producto.foto}" alt="">
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
        productosOrdenados = datos.slice().sort((a, b) => parseFloat(b.precio) - parseFloat(a.precio));
    } else if (orden === 'precioBajo') {
        productosOrdenados = datos.slice().sort((a, b) => parseFloat(a.precio) - parseFloat(b.precio));
    } else if (orden === 'nombreAsc') {
        productosOrdenados = datos.slice().sort((a, b) => a.name.localeCompare(b.name));
    } else if (orden === 'nombreDesc') {
        productosOrdenados = datos.slice().sort((a, b) => b.name.localeCompare(a.name));
    } else {
        productosOrdenados = datos.slice();
    }

    mostrarProductos(productosOrdenados);
}

document.getElementById('ordenar').addEventListener('change', function () {
    ordenarProductos();
});
