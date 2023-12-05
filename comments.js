document.addEventListener("DOMContentLoaded", function () {
  // Obtiene el elemento de comentarios y el área de entrada de comentarios
  var commentsSection = document.getElementById("comments");
  var commentInput = document.getElementById("commentInput");

  // Muestra los comentarios existentes al cargar la página
  showComments();

  // Maneja el evento de clic en el botón de publicar comentario
  document.getElementById("commentBtn").addEventListener("click", function () {
    // Obtiene el texto del comentario
    var commentText = commentInput.value;

    // Verifica si el comentario no está vacío
    if (commentText.trim() !== "") {
      // Crea un nuevo comentario
      var newComment = createComment(commentText);

      // Agrega el nuevo comentario a la lista de comentarios
      commentsSection.appendChild(newComment);

      // Limpia el área de entrada de comentarios
      commentInput.value = "";

      // Guarda los comentarios en el almacenamiento local
      saveComments();

      // Puedes agregar lógica adicional, como enviar los comentarios a un servidor, aquí.
    }
  });

  // Maneja el evento de clic en el botón de borrar comentarios
  document
    .getElementById("deleteCommentsBtn")
    .addEventListener("click", function () {
      // Borra todos los comentarios
      commentsSection.innerHTML = "";

      // Limpia el almacenamiento local
      for (i = saveComments(); i < 0; i--) {
        localStorage.removeItem("comments");
      }
    });

  // Función para mostrar comentarios existentes
  function showComments() {
    var comments = getComments();

    // Limpia la sección de comentarios antes de mostrar los comentarios
    commentsSection.innerHTML = "";

    // Muestra cada comentario
    comments.forEach(function (commentText) {
      var comment = createComment(commentText);
      commentsSection.appendChild(comment);
    });
  }

  // Función para obtener comentarios del almacenamiento local
  function getComments() {
    var storedComments = localStorage.getItem("comments");

    return storedComments ? JSON.parse(storedComments) : [];
  }

  // Función para guardar comentarios en el almacenamiento local
  function saveComments() {
    var comments = Array.from(commentsSection.children).map(function (comment) {
      return comment.textContent.trim();
    });

    localStorage.setItem("comments", JSON.stringify(comments));
  }

  // Función para crear un nuevo comentario
  function createComment(commentText) {
    var comment = document.createElement("div");
    comment.className = "comment";
    comment.textContent = commentText;

    return comment;
  }
});
