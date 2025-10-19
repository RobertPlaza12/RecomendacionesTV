/* renderPeliculas.js
   Utilidades pequeñas para manejar favoritos: agregar, eliminar y mostrar.
   Expectativas:
   - Películas están en `data/peliculas.json` (cada objeto tiene `id` y `titulo` o `nombre`).
   - API en `api/favoritos.php` maneja GET (lista), POST (agregar JSON) y DELETE (uri ending with id).
*/

function agregarFavorito(id) {
    return fetch('data/peliculas.json')
        .then(response => {
            if (!response.ok) throw new Error('No se pudo cargar data/peliculas.json');
            return response.json();
        })
        .then(data => {
            const pelicula = data.find(p => String(p.id) === String(id));
            if (!pelicula) throw new Error('Película no encontrada');
            const titulo = pelicula.titulo || pelicula.nombre || pelicula.nombre_pelicula || '';
            return fetch('api/favoritos.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: pelicula.id, titulo: titulo })
            });
        })
        .then(resp => resp.json())
        .then(body => ({ ok: true, body }))
        .catch(err => ({ ok: false, error: err.message }));
}

function eliminarFavorito(id) {
    return fetch(`api/favoritos.php/${encodeURIComponent(id)}`, { method: 'DELETE' })
        .then(r => r.json())
        .then(body => ({ ok: true, body }))
        .catch(err => ({ ok: false, error: err.message }));
}

function mostrarFavoritos(containerSelector = '#favoritos') {
    return fetch('api/favoritos.php')
        .then(r => {
            if (!r.ok) throw new Error('No se pudo obtener la lista de favoritos');
            return r.json();
        })
        .then(lista => {
            const div = document.querySelector(containerSelector);
            if (!div) {
                console.warn(`Contenedor ${containerSelector} no encontrado`);
                return lista;
            }
            div.innerHTML = '<h2>Favoritos:</h2>';
            if (!Array.isArray(lista) || lista.length === 0) {
                div.innerHTML += '<p>No hay favoritos aún.</p>';
                return lista;
            }
            lista.forEach(f => {
                const p = document.createElement('p');
                p.textContent = f.titulo || f.nombre || f.title || JSON.stringify(f);
                div.appendChild(p);
            });
            return lista;
        })
        .catch(err => {
            console.error('Error mostrando favoritos:', err);
            return [];
        });
}

// Exponer globalmente para que botones en HTML puedan llamarlas directamente
window.agregarFavorito = function (id) {
    agregarFavorito(id).then(result => {
        if (result.ok) alert(result.body.message || 'Agregado a favoritos');
        else alert('Error: ' + (result.error || JSON.stringify(result.body)));
    });
};

window.eliminarFavorito = function (id) {
    eliminarFavorito(id).then(result => {
        if (result.ok) alert(result.body.message || 'Eliminado de favoritos');
        else alert('Error: ' + (result.error || JSON.stringify(result.body)));
    });
};

window.mostrarFavoritos = function (selector) {
    return mostrarFavoritos(selector || '#favoritos');
};
