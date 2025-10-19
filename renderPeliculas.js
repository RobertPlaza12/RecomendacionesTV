// renderPeliculas_final.js

async function cargarPeliculas() {
    console.log('🚀 Intentando cargar películas...');
    
    // Intentar JSONP primero
    await cargarConJSONP();
    
    // Si falla, intentar con proxy después de 3 segundos
    setTimeout(() => {
        if (!window.peliculasCargadas) {
            console.log('🔄 JSONP falló, intentando con proxy...');
            cargarConProxy();
        }
    }, 3000);
}

function cargarConJSONP() {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://recomendacionestv.fwh.is/api_peliculas_simple.php?callback=mostrarPeliculas&_=' + Date.now();
        script.onload = resolve;
        script.onerror = resolve;
        document.head.appendChild(script);
    });
}

function cargarConProxy() {
    // Usar un proxy CORS público
    const proxyUrl = 'https://api.codetabs.com/v1/proxy?quest=';
    const targetUrl = 'https://recomendacionestv.fwh.is/api_peliculas.php';
    
    fetch(proxyUrl + encodeURIComponent(targetUrl))
        .then(response => response.json())
        .then(peliculas => {
            console.log('✅ Datos cargados via proxy:', peliculas);
            mostrarPeliculas(peliculas);
        })
        .catch(error => {
            console.error('❌ Proxy también falló:', error);
            usarDatosLocales();
        });
}

function usarDatosLocales() {
    console.log('📁 Cargando datos locales...');
    const peliculas = [
        {
            id: "1",
            titulo: "Inception",
            poster: "https://m.media-amazon.com/images/M/MV5BZDYwMDU0NTktMjg1MC00ZWNiLWE2ZTQtYzczZWMxZGM3OTJmXkEyXkFqcGc@._V1_.jpg",
            trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
            ibm: "https://www.imdb.com/title/tt1375666/",
            sinopsis: "Dom Cobb es un ladrón con la habilidad de entrar en los sueños de las personas y robar sus secretos.",
            actor1: "Leonardo DiCaprio",
            actor2: "Joseph Gordon-Levitt",
            actor3: "Elliot Page",
            actor4: "Tom Hardy"
        }
    ];
    mostrarPeliculas(peliculas);
}

window.mostrarPeliculas = function(peliculas) {
    console.log('🎬 Mostrar películas llamado con:', peliculas);
    window.peliculasCargadas = true;
    
    const contenedor = document.getElementById('contenedor-peliculas');
    if (!contenedor) return;
    
    contenedor.innerHTML = '';
    
    if (peliculas && peliculas.length > 0) {
        peliculas.forEach(pelicula => {
            const div = document.createElement('div');
            div.className = 'pelicula';
            div.innerHTML = `
                <h2>${pelicula.titulo}</h2>
                <img src="${pelicula.poster}" alt="${pelicula.titulo}">
                <p>${pelicula.sinopsis}</p>
                <p>Actores: ${pelicula.actor1}, ${pelicula.actor2}, ${pelicula.actor3}, ${pelicula.actor4}</p>
                <iframe src="${pelicula.trailer}" width="560" height="315"></iframe>
            `;
            contenedor.appendChild(div);
        });
    } else {
        contenedor.innerHTML = '<p>No se pudieron cargar las películas</p>';
    }
};

document.addEventListener('DOMContentLoaded', cargarPeliculas);