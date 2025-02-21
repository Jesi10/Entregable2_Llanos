const mascotas = [
    { nombre: "Max", tipo: "perro", edad: 2, tamaño: "mediano", caracter: "Juguetón y amistoso", imagen: "assets/imagen-max.jpg" },
    { nombre: "Bella", tipo: "perro", edad: 3, tamaño: "pequeño", caracter: "Cariñosa y tranquila", imagen: "assets/imagen-bella.jpg" },
    { nombre: "Rocky", tipo: "perro", edad: 5, tamaño: "grande", caracter: "Protector y leal", imagen: "assets/imagen-rocky.jpg" },
    { nombre: "Luna", tipo: "gato", edad: 8, tamaño: "mediano", caracter: "Curiosa y tranquila", imagen: "assets/imagen-luna.jpg" },
    { nombre: "Bruno", tipo: "perro", edad: 1, tamaño: "pequeño", caracter: "Compañero y manso", imagen: "assets/imagen-bruno.jpg" },
    { nombre: "Pomponcita", tipo: "perro", edad: 5, tamaño: "pequeño", caracter: "Curiosa e hiperactiva", imagen: "assets/imagen-pomponcita.jpg" },
    { nombre: "Chocolate", tipo: "perro", edad: 1, tamaño: "mediano", caracter: "Obediente y alegre", imagen: "assets/imagen-chocolate.jpg" },
    { nombre: "Puma", tipo: "gato", edad: 4, tamaño: "mediano", caracter: "Cariñoso y enojón", imagen: "assets/imagen-puma.jpg" },
    { nombre: "Gringo", tipo: "gato", edad: 5, tamaño: "mediano", caracter: "Explorador y cazador", imagen: "assets/imagen-gringo.jpg" }
];

const mascotasContainer = document.getElementById("mascotas-container");
const filtroTipo = document.getElementById("filtro-tipo");
const filtroTamaño = document.getElementById("filtro-tamaño");
const filtroEdad = document.getElementById("filtro-edad");
const historialContainer = document.getElementById("historial-container");

// Función para mostrar mascotas con filtros
function mostrarMascotas() {
    mascotasContainer.innerHTML = ""; // Limpiar contenido

    let mascotasFiltradas = mascotas.filter(mascota => {
        const tipoSeleccionado = filtroTipo.value === "todos" || mascota.tipo === filtroTipo.value;
        const tamañoSeleccionado = filtroTamaño.value === "todos" || mascota.tamaño === filtroTamaño.value;
        const edadSeleccionada = filtroEdad.value === "todos" || 
            (filtroEdad.value === "joven" && mascota.edad < 3) ||
            (filtroEdad.value === "adulto" && mascota.edad >= 3 && mascota.edad <= 7) ||
            (filtroEdad.value === "mayor" && mascota.edad > 7);

        return tipoSeleccionado && tamañoSeleccionado && edadSeleccionada;
    });

    mascotasFiltradas.forEach(mascota => {
        const card = document.createElement('article');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${mascota.imagen}" alt="${mascota.nombre}" />
            <h3>${mascota.nombre}</h3>
            <button class="ver-mas" data-nombre="${mascota.nombre}" data-edad="${mascota.edad}" data-tamaño="${mascota.tamaño}" data-caracter="${mascota.caracter}" data-imagen="${mascota.imagen}">Conóceme más</button>
        `;
        mascotasContainer.appendChild(card);

        card.querySelector(".ver-mas").addEventListener("click", (e) => {
            abrirModal(e.target);
        });
    });
}

// Evento de cambio en filtros
[filtroTipo, filtroTamaño, filtroEdad].forEach(filtro => {
    filtro.addEventListener("change", mostrarMascotas);
});

// Función para guardar en el historial
function guardarEnHistorial(mascota) {
    let historial = JSON.parse(localStorage.getItem("historialMascotas")) || [];
    const yaVista = historial.some(item => item.nombre === mascota.nombre);

    if (!yaVista) {
        historial.push(mascota);
        localStorage.setItem("historialMascotas", JSON.stringify(historial));
        actualizarHistorial();
    }
}

// Función para abrir modal
function abrirModal(boton) {
    const mascota = {
        nombre: boton.dataset.nombre,
        edad: boton.dataset.edad,
        tamaño: boton.dataset.tamaño,
        caracter: boton.dataset.caracter,
        imagen: boton.dataset.imagen
    };

    document.getElementById("modal-nombre").textContent = mascota.nombre;
    document.getElementById("modal-edad").textContent = mascota.edad;
    document.getElementById("modal-tamaño").textContent = mascota.tamaño;
    document.getElementById("modal-caracter").textContent = mascota.caracter;
    document.getElementById("boton-adoptar").href = `html/contacto.html?motivo=adopcion&mascota=${encodeURIComponent(mascota.nombre)}`;

    guardarEnHistorial(mascota);

    document.getElementById("modal").style.display = "flex";
}

// Función para cerrar modal
document.querySelector(".cerrar").addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
});

// Función para actualizar el historial
function actualizarHistorial() {
    const historial = JSON.parse(localStorage.getItem("historialMascotas")) || [];
    historialContainer.innerHTML = "";

    if (historial.length === 0) {
        historialContainer.innerHTML = "<p>No has visto ninguna mascota aún.</p>";
    } else {
        historial.forEach(mascota => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.style.width = "200px";  
            card.innerHTML = `
                <img src="${mascota.imagen}" alt="${mascota.nombre}" style="width: 100%; border-radius: 5px;" />
                <h3>${mascota.nombre}</h3>
                <p>Edad: ${mascota.edad} años</p>
                <p>Tamaño: ${mascota.tamaño}</p>
                <p>Caracter: ${mascota.caracter}</p>
            `;
            historialContainer.appendChild(card);
        });
    }
}

// Mostrar historial cuando se cargue la página
document.addEventListener("DOMContentLoaded", function () {
    mostrarMascotas();
    actualizarHistorial();
});
