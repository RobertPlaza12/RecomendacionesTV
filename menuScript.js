axios.get("menu.json")
    .then(response => {
        const menuData = response.data;
        const menus = document.getElementById("menu");
        const ul = document.createElement("ul");

        menuData.forEach(item => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.textContent = item.nombre;
            a.href = item.url;
            li.appendChild(a);
            ul.appendChild(li);
        });

        menus.appendChild(ul);
    })
    .catch(error => console.error("error cargando el menu", error));