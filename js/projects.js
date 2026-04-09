window.onload = () => {
  fetch("URL_DE_TU_API")
    .then((response) => {
      if (!response.ok) throw new Error("Error en la petición HTTP");
      return response.json();
    })
    .then((data) => {
      if (data.length < 4) {
        console.error("La API no tiene suficientes proyectos.");
        return;
      }

      // 1. Obtener 4 proyectos aleatorios y separarlos
      const proyectosAleatorios = data
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
      const proyectoPrincipal = proyectosAleatorios[0];
      const proyectosTarjetas = proyectosAleatorios.slice(1, 4);

      // 2. Poblar el artículo principal (requiere los IDs en el HTML)
      document.getElementById("nombre").textContent = proyectoPrincipal.name;
      document.getElementById("descripcion").textContent =
        proyectoPrincipal.description;
      // Se asume que añadiste el id="contenido" y "fecha-completado" como vimos antes
      // document.getElementById('contenido').innerHTML = proyectoPrincipal.content;
      document.getElementById("imagen").src = proyectoPrincipal.image;
      document.getElementById("fecha-completado").textContent =
        proyectoPrincipal.completed_on;

      // 3. Poblar las tarjetas existentes
      // Selecciona todos los divs que tengan ambas clases: "project" y "card"
      const tarjetasDOM = document.querySelectorAll(".project.card");

      // Itera sobre los 3 proyectos destinados a las tarjetas
      proyectosTarjetas.forEach((proyecto, index) => {
        // Asegura que hay una tarjeta en el HTML para este índice (0, 1, 2)
        if (tarjetasDOM[index]) {
          const tarjetaActual = tarjetasDOM[index];

          // Busca y actualiza los elementos dentro de esa tarjeta específica
          tarjetaActual.querySelector("img").src = proyecto.image;
          tarjetaActual.querySelector("img").alt = `Imagen de ${proyecto.name}`;
          tarjetaActual.querySelector("h4").textContent = proyecto.name;
          tarjetaActual.querySelector("p").textContent = proyecto.description;
          tarjetaActual.querySelector("a").href =
            `projects.html?uuid=${proyecto.uuid}`;
        }
      });
    })
    .catch((error) => {
      console.error("Error al procesar los datos:", error);
    });
};
