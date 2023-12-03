  document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario
  
    // Obtener los valores ingresados en el formulario
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var comment = document.getElementById('comment').value;
    var rating = document.getElementById('rating').value; // Nuevo: Obtener la puntuación
  
    // Crear un elemento de lista y agregar los valores del comentario y la puntuación
    var listItem = document.createElement('li');
    listItem.innerHTML = '<strong>Nombre:</strong> ' + name + '<br><strong>Email:</strong> ' + email + '<br><strong>Comentario:</strong> ' + comment + '<br><strong>Puntuación:</strong> ' + rating;
  
    // Agregar el elemento de lista al contenedor de comentarios
    document.getElementById('commentList').appendChild(listItem);
  
    // Limpiar los campos del formulario
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('comment').value = '';
    document.getElementById('rating').value = '1'; // Restablecer la puntuación por defecto
  });
  