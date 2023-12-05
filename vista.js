document.addEventListener("DOMContentLoaded", function () {
    // Cargar el archivo JSON
    fetch("productos.json")
        .then(response => response.json())
        .then(data => {
            // Tomar el primer producto del JSON
            const producto = data[0];

            // Crear elementos HTML para el producto
            var productoElement = document.createElement("div");
            productoElement.classList.add("stylevistaproductos"); // Agregar una clase CSS al div
            productoElement.innerHTML = `
                    <div class="single-pro-details">
                    <h6>${producto.marca}</h6>
                    <h5>${producto.name}</h5>
                    <h2>${producto.precio}</h2>  
                    
                    <div class="product-description">
                        <h2>Descripcion del producto</h2>
                        <span>${producto.descCorta}</span>
                    </div>

                    <div class="details-product">
                        <h2>Descripción detallada</h2>
                        <p>${producto.descLarga}</p>
                    </div>
                </div>
            `;

            // Limpiar el contenido previo del contenedor "producto"
            var productoContainer = document.getElementById("producto");
            productoContainer.innerHTML = "";

            // Agregar el producto al contenedor
            productoContainer.appendChild(productoElement);
        })
        .catch(error => console.error("Error al cargar el producto:", error));
});
