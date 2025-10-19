// peliculas.js

// URL de tu API en InfinityFree
const API_URL = 'https://recomendacionestv.fwh.is/api_peliculas.php';

// Función principal para cargar y mostrar películas
async function cargarYMostrarPeliculas() {
    try {
        console.log('🔄 Cargando películas desde:', API_URL);
        
        const respuesta = await fetch(API_URL);
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        
        const peliculas = await respuesta.json();
        console.log('✅ Películas cargadas:', peliculas);
        
        // Mostrar cada película en el frontend
        peliculas.forEach(pelicula => {
            crearElementoPelicula(pelicula);
        });
        
    } catch (error) {
        console.error('❌ Error cargando películas:', error);
        mostrarError('No se pudieron cargar las películas. Intenta más tarde.');
    }
}

// Función para crear el HTML de cada película
function crearElementoPelicula(pelicula) {
    // Crear el contenedor principal
    const divPelicula = document.createElement('div');
    divPelicula.className = 'pelicula';
    divPelicula.id = `pelicula-${pelicula.id}`;
    
    // Crear el contenido HTML
    divPelicula.innerHTML = `
        <img src="${pelicula.poster}" alt="Póster de ${pelicula.titulo}" onerror="this.src='https://via.placeholder.com/300x450/333/fff?text=Poster+No+Disponible'">
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
    
    // Agregar al contenedor principal en tu HTML
    const contenedor = document.getElementById('contenedor-peliculas');
    if (contenedor) {
        contenedor.appendChild(divPelicula);
    } else {
        console.error('❌ No se encontró el contenedor con id "contenedor-peliculas"');
    }
}

// Función para mostrar errores
function mostrarError(mensaje) {
    const contenedor = document.getElementById('contenedor-peliculas');
    if (contenedor) {
        contenedor.innerHTML = `<div class="error">${mensaje}</div>`;
    }
}

// Función para cargar una película específica por ID
async function cargarPeliculaPorId(id) {
    try {
        const respuesta = await fetch(API_URL);
        const peliculas = await respuesta.json();
        
        const pelicula = peliculas.find(p => p.id == id);
        if (pelicula) {
            crearElementoPelicula(pelicula);
        } else {
            console.error(`❌ No se encontró película con ID: ${id}`);
        }
    } catch (error) {
        console.error('❌ Error cargando película:', error);
    }
}

// Cargar películas cuando la página esté lista
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando carga de películas...');
    cargarYMostrarPeliculas();
});
