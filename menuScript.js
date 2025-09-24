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

            // Verificar si el ítem tiene submenús
            if (item.subMenu && Array.isArray(item.subMenu)) {
                const subUl = document.createElement("ul");

                item.subMenu.forEach(subItem => {
                    const subLi = document.createElement("li");
                    const subA = document.createElement("a");
                    subA.textContent = subItem.nombre;
                    subA.href = subItem.url;
                    subLi.appendChild(subA);
                    subUl.appendChild(subLi);
                });

                li.appendChild(subUl);
            }

            ul.appendChild(li);
        });

        menus.appendChild(ul);
    })
    .catch(error => console.error("Error cargando el menú:", error));