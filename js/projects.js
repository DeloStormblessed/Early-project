window.onload = async () => {
  try {
    const response = await fetch("js/data.json");
    if (!response.ok) throw new Error("Error al cargar el archivo JSON local");

    const data = await response.json();
    if (data.length < 4) return;

    const urlParams = new URLSearchParams(window.location.search);
    const uuidSeleccionado = urlParams.get("uuid");

    let proyectoPrincipal;
    if (uuidSeleccionado) {
      proyectoPrincipal = data.find(
        (p) => String(p.uuid) === String(uuidSeleccionado),
      );
    }

    if (!proyectoPrincipal) {
      proyectoPrincipal = data[Math.floor(Math.random() * data.length)];
    }

    // --- 3. POBLACIÓN DEL ARTÍCULO PRINCIPAL ---
    const elementoNombre = document.getElementById("nombre");
    if (elementoNombre && proyectoPrincipal) {
      elementoNombre.textContent = proyectoPrincipal.name;
      document.getElementById("descripcion").textContent =
        proyectoPrincipal.description;
      document.getElementById("imagen").src = proyectoPrincipal.image;
      document.getElementById("imagen").alt =
        `Imagen de ${proyectoPrincipal.name}`;
      document.getElementById("contenido").textContent =
        proyectoPrincipal.content;

      // ESTA ES LA LÍNEA QUE FALTABA:
      // Asegúrate de que el ID 'fecha' coincida con tu HTML
      // y que 'completed_on' coincida con tu archivo JSON
      const elementoFecha = document.getElementById("fecha-completado");
      if (elementoFecha) {
        elementoFecha.textContent = proyectoPrincipal.completed_on;
      }
    }

    // --- 4. POBLACIÓN DE TARJETAS ---
    const restoProyectos = data.filter(
      (p) => p.uuid !== proyectoPrincipal.uuid,
    );
    const proyectosTarjetas = restoProyectos
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const tarjetasDOM = document.querySelectorAll(".project.card");
    proyectosTarjetas.forEach((proyecto, index) => {
      if (tarjetasDOM[index]) {
        const tarjetaActual = tarjetasDOM[index];
        tarjetaActual.querySelector("img").src = proyecto.image;
        tarjetaActual.querySelector("img").alt = `Imagen de ${proyecto.name}`;
        tarjetaActual.querySelector("h4").textContent = proyecto.name;
        tarjetaActual.querySelector("p").textContent = proyecto.description;
        tarjetaActual.querySelector("a").href =
          `projects.html?uuid=${proyecto.uuid}`;
      }
    });
  } catch (error) {
    console.error("Error al procesar los datos:", error);
  }
};
