const apiUrl = 'http://localhost:3000';

// Función para listar todos los doctores
function fetchPacientes() {
    fetch(`${apiUrl}/doctores`)

        .then(response => response.json())
        .then(data => {
            const listaDoctores = document.getElementById('lista-doctores');
            listaDoctores.innerHTML = '';

            data.forEach(doctor => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>Nombre: ${doctor.nombre}</strong>`;
                li.innerHTML += `Usuario: ${doctor.usuario}`;

                listaDoctores.appendChild(li);

            });
        });
}
fetchPacientes();
