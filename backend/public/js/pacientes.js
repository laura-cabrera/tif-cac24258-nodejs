const apiUrl = process.env.API_URL || 'http://localhost:3000';

// Función para crear un paciente
document.getElementById('pacienteForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const especie = document.getElementById('especie').value;
    const edad = document.getElementById('edad').value;
    const propietario = document.getElementById('propietario').value;

    fetch(`${apiUrl}/pacientes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, especie, edad, propietario })
    })
        .then(response => response.json())
        .then(() => {
            document.getElementById('pacienteForm').reset();
            alert('Paciente creado con éxito.');
            fetchPacientes();
        });
});

// Función para listar todos los pacientes
function fetchPacientes() {
    fetch(`${apiUrl}/pacientes` , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
    }
})

        .then(response => response.json())
        .then(data => {
            const listaPacientes = document.getElementById('lista-pacientes');
            listaPacientes.innerHTML = '';

            data.forEach(paciente => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>Nombre: ${paciente.nombre}</strong>`;
                li.innerHTML += `Especie: ${paciente.especie}`;
                li.innerHTML += `<br>Edad:${paciente.edad}`;
                li.innerHTML += `<br>Propietario: ${paciente.propietario}`;
                li.innerHTML += `<br>Id: ${paciente.id}<br>`;

                li.innerHTML += `<button class="btn-editar" onclick="editPaciente(${paciente.id})">Editar</button>`
                li.innerHTML += `<button class="btn-eliminar" onclick="deletePaciente(${paciente.id})">Eliminar</button>`;

                listaPacientes.appendChild(li);

            });
        });
}
fetchPacientes();

// Función para editar un paciente
function editPaciente(id) {
    fetch(`${apiUrl}/pacientes/${id}`)
        .then(response => response.json())
        .then(paciente => {
            const nuevoNombre = prompt('Ingrese el nuevo nombre:', paciente.nombre) || paciente.nombre;
            const nuevaEspecie = prompt('Ingrese la nueva especie:', paciente.especie) || paciente.especie;
            const nuevaEdad = prompt('Ingrese la nueva edad:', paciente.edad) || paciente.edad;
            const nuevoPropietario = prompt('Ingrese el nuevo propietario:', paciente.propietario) || paciente.propietario;

            //  // si el usuario presionó Cancelar en alguno de los prompts
            if (nuevoNombre === null || nuevaEspecie === null || nuevaEdad === null || nuevoPropietario === null) {
                console.log('Edición cancelada por el usuario.');
                return; // Salir de la función
            }
            // Construir objeto con valores no nulos
            const datosActualizados = {};
            if (nuevoNombre !== null) datosActualizados.nombre = nuevoNombre;
            if (nuevaEspecie !== null) datosActualizados.especie = nuevaEspecie;
            if (nuevaEdad !== null) datosActualizados.edad = nuevaEdad;
            if (nuevoPropietario !== null) datosActualizados.propietario = nuevoPropietario;

            fetch(`${apiUrl}/pacientes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosActualizados)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al actualizar el paciente.');
                    }
                    return response.json();
                })
                .then(() => {
                    alert('Paciente editado con éxito.');
                    fetchPacientes()})
                .catch(error => {
                    console.error('Error:', error);
                    alert('Edicion cancelada.')
                });
        })
        .catch(error => {
            console.error('Error al obtener el paciente:', error);
            alert('Edicion cancelada.')
        });
}

// Función para borrar un paciente
function deletePaciente(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este paciente?')) {
        fetch(`${apiUrl}/pacientes/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                alert('Paciente borrado con éxito.');
                fetchPacientes()});
    }
}

fetchPacientes();
