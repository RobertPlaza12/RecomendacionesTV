// renderPeliculas.js

// Función principal con JSONP
function cargarYMostrarPeliculas() {
    console.log('🔄 Cargando películas via JSONP...');
    
    // Crear script para JSONP
    const script = document.createElement('script');
    script.src = 'https://recomendacionestv.fwh.is/api_peliculas_jsonp.php?callback=mostrarPeliculas&_=' + Date.now();
    document.head.appendChild(script);
}

// Función callback que se ejecutará con los datos
function mostrarPeliculas(peliculas) {
    console.log('✅ Películas cargadas via JSONP:', peliculas);
    
    const contenedor = document.getElementById('contenedor-peliculas');
    if (!contenedor) {
        console.error('❌ No se encontró el contenedor');
        return;
    }
    
    // Limpiar contenedor
    contenedor.innerHTML = '';
    
    // Mostrar cada película
    if (peliculas && peliculas.length > 0) {
        peliculas.forEach(pelicula => {
            crearElementoPelicula(pelicula);
        });
    } else {
        mostrarError('No se encontraron películas');
    }
}

// Tu función existente para crear el HTML
function crearElementoPelicula(pelicula) {
    const divPelicula = document.createElement('div');
    divPelicula.className = 'pelicula';
    divPelicula.innerHTML = `
        <img src="${pelicula.poster}" alt="Póster de ${pelicula.titulo}" 
             onerror="this.src='https://via.placeholder.com/300x450/333/fff?text=Poster+No+Disponible'">
        <h2>${pelicula.titulo}</h2>
        <p><strong>Sinopsis:</strong> ${pelicula.sinopsis}</p>
        <p><strong>Actores principales:</strong></p>
        <ul>
            <li>${pelicula.actor1 || 'No disponible'}</li>
            <li>${pelicula.actor2 || 'No disponible'}</li>
            <li>${pelicula.actor3 || 'No disponible'}</li>
            <li>${pelicula.actor4 || 'No disponible'}</li>
        </ul>
        <div class="clear"></div>
        <h3>Tráiler:</h3>
        <iframe 
            width="560" 
            height="315" 
            src="${pelicula.trailer}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
        <p><a href="${pelicula.ibm}" target="_blank">Más sobre ${pelicula.titulo} en IMDb</a></p>
    `;
    
    document.getElementById('contenedor-peliculas').appendChild(divPelicula);
}

function mostrarError(mensaje) {
    const contenedor = document.getElementById('contenedor-peliculas');
    if (contenedor) {
        contenedor.innerHTML = `<div class="error">${mensaje}</div>`;
    }
}

// Iniciar cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando carga de películas...');
    cargarYMostrarPeliculas();
});
