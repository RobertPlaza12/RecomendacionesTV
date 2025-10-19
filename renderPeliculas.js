
function agregarFavorito(id) {
    fetch('api/peliculas.json')
        .then(response => response.json())
        .then(data => {
            const pelicula = data.find(p => p.id === id);
            if (pelicula) {
                fetch('api/favoritos.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: pelicula.id, titulo: pelicula.titulo })
                })
                .then(r => r.json())
                .then(d => alert(d.message));
            }
        });
}

function eliminarFavorito(id) {
    fetch(`api/favoritos.php/${id}`, { method: 'DELETE' })
        .then(r => r.json())
        .then(d => alert(d.message));
}

function mostrarFavoritos() {
    fetch('api/favoritos.php')
        .then(r => r.json())
        .then(lista => {
            const div = document.getElementById('favoritos');
            div.innerHTML = "<h2>Favoritos:</h2>";
            lista.forEach(f => {
                div.innerHTML += `<p>${f.titulo}</p>`;
            });
        });
}