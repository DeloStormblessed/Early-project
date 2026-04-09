window.onload = () => {
  fetch("js/data.json")
    .then((response) => {
      if (!response.ok)
        throw new Error("Error al cargar el archivo JSON local");
      return response.json();
    })
    .then((data) => {
      if (data.length < 4) {
        console.error("El archivo JSON no tiene suficientes proyectos.");
        return;
      }

      const urlParams = new URLSearchParams(window.location.search);
      const uuidSeleccionado = urlParams.get("uuid");

      let proyectoPrincipal;

      if (uuidSeleccionado) {
        proyectoPrincipal = data.find(
          (p) => String(p.uuid) === String(uuidSeleccionado),
        );
      }

      if (!proyectoPrincipal) {
        const indiceAleatorio = Math.floor(Math.random() * data.length);
        proyectoPrincipal = data[indiceAleatorio];
      }

      const restoProyectos = data.filter(
        (p) => p.uuid !== proyectoPrincipal.uuid,
      );
      const proyectosTarjetas = restoProyectos
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      // COMPROBACIÓN CLAVE: Solo intenta poblar el artículo si encuentra el ID 'nombre'
      const elementoNombre = document.getElementById("nombre");

      if (elementoNombre) {
        elementoNombre.textContent = proyectoPrincipal.name;
        document.getElementById("descripcion").textContent =
          proyectoPrincipal.description;
        document.getElementById("imagen").src = proyectoPrincipal.image;
        document.getElementById("imagen").src = proyectoPrincipal.image;
        document.getElementById("contenido").textContent =
          proyectoPrincipal.content;
        // document.getElementById('contenido').innerHTML = proyectoPrincipal.content;
      }

      // Población de tarjetas (funciona en ambas páginas porque busca las clases)
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
    })
    .catch((error) => {
      console.error("Error al procesar los datos:", error);
    });
};
