// Seleccionar ambos formularios
const contactForm = document.querySelector(".name-form");
const newsletterForm = document.querySelector(".newsletter-form");

// ==========================================
// 1. Lógica del Formulario de Contacto
// ==========================================
if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtener valores
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    // 1. Campos obligatorios
    if (!name || !email || !message) {
      alert("Error: Name, Email, and Message are required.");
      return;
    }

    // 2. Regla Ironhack
    if (name.toLowerCase() === "ironhack") {
      alert("You cannot be Ironhack, because I am Ironhack.");
      return;
    }

    // 3. Validación de caracteres del nombre
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
      alert("Error: Name contains invalid characters. Use letters only.");
      return;
    }

    // 4. Validación de formato de Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Error: Invalid email format.");
      return;
    }

    // 5. Validación opcional de Teléfono
    if (phone) {
      const phoneRegex = /^[\d\s\+\-\(\)]+$/;
      if (!phoneRegex.test(phone)) {
        alert("Error: Invalid phone number format.");
        return;
      }
    }

    // Éxito
    alert("Submitted.");
    // contactForm.submit(); // Descomentar para enviar datos reales al servidor
  });
}

// ==========================================
// 2. Lógica del Formulario de Suscripción
// ==========================================
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // 1. Localizar el contenedor donde residen el formulario, el h3 y el aside
    const parentContainer = this.parentElement;

    // 2. Seleccionar los elementos a eliminar dentro de ese contenedor
    const headingToRemove = parentContainer.querySelector("h3");
    const asideToRemove = parentContainer.querySelector("aside");

    // 3. Eliminarlos del DOM si existen
    if (headingToRemove) headingToRemove.remove();
    if (asideToRemove) asideToRemove.remove();

    // 4. Reemplazar el formulario por el mensaje de éxito
    this.innerHTML = '<h3 class="success-message">Subscribed!</h3>';
  });
}
