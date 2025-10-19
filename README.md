# Peliculas

Este pequeño proyecto contiene datos de películas en `data/peliculas.json` y un script `renderPeliculas.js` que permite renderizar las películas en el DOM.

Uso rápido:

1. Incluir el script en tu HTML (por ejemplo en `peliculas.html` o `index.html`):

	<script src="renderPeliculas.js"></script>

2. Añadir un contenedor donde se renderizarán todas las películas:

	<div id="peliculas-list"></div>

Al cargar la página, si existe `#peliculas-list` el script renderizará automáticamente todas las películas.

3. Para renderizar una sola película por id desde otro script o desde consola:

	PeliculasRenderer.renderById(3, '#pelicula-single');

Nota: `peliculas.json` usa la propiedad `ibm` para el enlace a IMDb (hay un pequeño typo). El script comprueba `ibm` y `imdb`.
