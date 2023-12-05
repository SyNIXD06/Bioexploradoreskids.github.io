document.addEventListener("DOMContentLoaded", function () {
  // Obtiene el elemento de avisos y el área de entrada de avisos
  var noticesSection = document.getElementById("notices");
  var noticeInput = document.getElementById("noticeInput");

  // Muestra los avisos existentes al cargar la página
  showNotices();

  // Maneja el evento de clic en el botón de publicar aviso
  document.getElementById("noticeBtn").addEventListener("click", function () {
    // Obtiene el texto del aviso
    var noticeText = noticeInput.value;

    // Verifica si el aviso no está vacío
    if (noticeText.trim() !== "") {
      // Crea un nuevo aviso
      var newNotice = createNotice(noticeText);

      // Agrega el nuevo aviso a la lista de avisos
      noticesSection.appendChild(newNotice);

      // Limpia el área de entrada de avisos
      noticeInput.value = "";

      // Guarda los avisos en el almacenamiento local
      saveNotices();

      // Puedes agregar lógica adicional, como enviar los avisos a un servidor, aquí.
    }
  });

  // Maneja el evento de clic en el botón de borrar avisos
  document
    .getElementById("deleteNoticesBtn")
    .addEventListener("click", function () {
      // Borra todos los avisos
      noticesSection.innerHTML = "";

      // Limpia el almacenamiento local
      localStorage.removeItem("notices");
    });

  // Función para mostrar avisos existentes
  function showNotices() {
    var notices = getNotices();

    // Limpia la sección de avisos antes de mostrar los avisos
    noticesSection.innerHTML = "";

    // Muestra cada aviso
    notices.forEach(function (noticeText) {
      var notice = createNotice(noticeText);
      noticesSection.appendChild(notice);
    });
  }

  // Función para obtener avisos del almacenamiento local
  function getNotices() {
    var storedNotices = localStorage.getItem("notices");

    return storedNotices ? JSON.parse(storedNotices) : [];
  }

  // Función para guardar avisos en el almacenamiento local
  function saveNotices() {
    var notices = Array.from(noticesSection.children).map(function (notice) {
      return notice.textContent.trim();
    });

    localStorage.setItem("notices", JSON.stringify(notices));
  }

  // Función para crear un nuevo aviso
  function createNotice(noticeText) {
    var notice = document.createElement("div");
    notice.className = "notice";
    notice.textContent = noticeText;

    return notice;
  }
});
