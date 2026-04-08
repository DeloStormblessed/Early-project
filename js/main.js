// Paso A: "Atrapar" los elementos por su ID
const menuBtn = document.getElementById("menu-toggle");
const navLinks = document.getElementById("navbar-links");

// Paso B: Escuchar cuando el usuario hace clic
menuBtn.addEventListener("click", () => {
  // Paso C: Usamos 'toggle'.
  // Si la clase "show" no está, la pone (abre el menú).
  // Si ya está, la quita (cierra el menú).
  navLinks.classList.toggle("show");
});
