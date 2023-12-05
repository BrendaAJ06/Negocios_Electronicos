document.addEventListener("DOMContentLoaded", function () {
    // Cargar el archivo JSON
    fetch("productos.json")
        .then(response => response.json())
        .then(data => {
            // Tomar el primer producto del JSON
            const producto = data[2];

            // Crear elementos HTML para el producto
            var productoElement = document.createElement("div");
            productoElement.classList.add("stylevistaproductos"); // Agregar una clase CSS al div
            productoElement.innerHTML = `
                    <div class="single-pro-details">
                    <h6>${producto.marca}</h6>
                    <h5>${producto.name}</h5>
                    <h2>${producto.precio}</h2>  
                   <form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post" target="_blank">
  <input type="hidden" name="cmd" value="_s-xclick" />
  <input type="hidden" name="hosted_button_id" value="FH8SSYNKNDAFC" />
  <input type="hidden" name="currency_code" value="MXN" />
  <input type="image" src="https://www.paypalobjects.com/es_XC/i/btn/btn_cart_LG.gif" border="0" name="submit" title="PayPal es una forma segura y fácil de pagar en línea." alt="Agregar al carrito" />
</form><form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post" target="_blank">
  <input type="hidden" name="cmd" value="_s-xclick" />
  <input type="hidden" name="hosted_button_id" value="FH8SSYNKNDAFC" />
  <input type="hidden" name="currency_code" value="MXN" />
  <input type="image" src="https://www.paypalobjects.com/es_XC/i/btn/btn_cart_LG.gif" border="0" name="submit" title="PayPal es una forma segura y fácil de pagar en línea." alt="Agregar al carrito" />
</form> 

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
