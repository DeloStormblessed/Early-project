// Seleccionar el formulario por su clase
const form = document.querySelector(".name-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Obtener valores
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  // 1. Campos obligatorios (Nombre, Email y Mensaje)
  if (!name || !email || !message) {
    alert("Error: Name, Email, and Message are required.");
    return;
  }

  // 2. Regla Ironhack
  if (name.toLowerCase() === "ironhack") {
    alert("You cannot be Ironhack, because I am Ironhack.");
    return;
  }

  // 3. Validación de caracteres del nombre (solo letras y espacios)
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

  // 5. Validación opcional de Teléfono (si se introduce, que sean números y símbolos válidos)
  if (phone) {
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(phone)) {
      alert("Error: Invalid phone number format.");
      return;
    }
  }

  // Éxito
  alert("Validation successful.");
  // form.submit(); // Descomentar para enviar datos reales al servidor
});
