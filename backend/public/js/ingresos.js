const apiUrl = 'http://localhost:3000';

// Función para listar todos los ingresos
function fetchIngresos() {
  fetch(`${apiUrl}/ingresos`)

      .then(response => response.json())
      .then(data => {
          const listaIngresos = document.getElementById('lista-ingresos');
          listaIngresos.innerHTML = '';

          data.forEach(ingreso => {
              const li = document.createElement('li');
              li.innerHTML = `<strong>Nombre: ${ingreso.nombre_paciente}</strong>`;
              li.innerHTML += `Fecha: ${ingreso.fecha}`;
              li.innerHTML += `<br>Motivo: ${ingreso.motivo}`;
              li.innerHTML += `<br>Id: ${ingreso.id}<br>`;

              listaIngresos.appendChild(li);

          });
      });
}
fetchIngresos();