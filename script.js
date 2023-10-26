$(document).ready(function() {
  $('.carousel').slick({
    // Configuraciones del carrusel
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
  });
});

$(document).ready(function() {
  $('.carousel-marcas').slick({
    // Configuraciones del carrusel
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1
  });
});

function addToCart(imagePath) {
  var quantity = document.getElementById("quantity").value;

  // Obtener los detalles del producto
  var productName = document.querySelector("#product-details h2").innerText;
  var productPrice = 87.00; // Precio del producto (puedes obtenerlo del servidor o establecerlo manualmente)

  // Crear una nueva fila en la tabla del carrito
  var newRow = document.createElement("tr");
  newRow.innerHTML = `
      <td><a href="#"><i class="far fa-times-circle"></i></a></td>
      <td><img src="${imagePath}" alt="Producto"></td>
      <td>${productName}</td>
      <td>$${productPrice}</td>
      <td><input type="number" name="cantidad[]" value="${quantity}"></td>
      <td>$${(productPrice * quantity).toFixed(2)}</td>
      <td><input type="hidden" name="producto_id[]" value="1"></td>
  `;

  // Agregar la nueva fila al cuerpo de la tabla
  var cartTableBody = document.querySelector("#cart tbody");
  cartTableBody.appendChild(newRow);

  // Limpiar el campo de cantidad
  document.getElementById("quantity").value = "1";

  // Mostrar un mensaje de éxito (puedes personalizarlo según tus necesidades)
  alert("Producto agregado al carrito");

  // Opcional: Puedes realizar otros cálculos o acciones necesarias después de agregar el producto al carrito
}

document.addEventListener("DOMContentLoaded", function() {
  // Verificar si el carrito está vacío
  var emptyCartMessage = document.getElementById("empty-cart-message");
  var cartItems = document.getElementById("cart-items");
  if (emptyCartMessage && cartItems && cartItems.children.length === 0) {
    emptyCartMessage.style.display = "block";
  }

  // Agregar el event listener al formulario del carrito
  var cartForm = document.getElementById("cart-form");
  cartForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

    // Realizar una petición AJAX para enviar los datos del formulario al servidor
    var xhr = new XMLHttpRequest();
    xhr.open("POST", cartForm.action, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Manejar la respuesta del servidor
    xhr.onload = function() {
      if (xhr.status === 200) {
        // Procesar la respuesta del servidor si es necesario
        // Por ejemplo, puedes mostrar un mensaje de éxito o redireccionar a otra página
        alert("Carrito actualizado con éxito");
      } else {
        // Manejar el error de la solicitud al servidor
        alert("Hubo un error al actualizar el carrito");
      }
    };

    // Enviar los datos del formulario al servidor
    xhr.send(new FormData(cartForm));
  });
});
