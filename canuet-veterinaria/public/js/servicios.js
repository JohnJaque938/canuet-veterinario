console.log('servicios.js cargado');
// Proteger admin
const userId = localStorage.getItem('userId');
const rol = localStorage.getItem('rol');

if (!userId || rol !== 'ADMIN') {
  window.location.href = '/login.html';
}
const form = document.getElementById('servicioForm');
const table = document.getElementById('serviciosTable');
const mensaje = document.getElementById('mensaje');
const serviceId = document.getElementById('serviceId');
const nombre = document.getElementById('nombre');
const descripcion = document.getElementById('descripcion');
const precio = document.getElementById('precio');
// Listar servicios
async function loadServicios() {
  const res = await fetch('/api/servicios');
  const servicios = await res.json();
  table.innerHTML = '';
  servicios.forEach(servicio => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${servicio.nombre}</td>
      <td>${servicio.descripcion || '—'}</td>
      <td>$${servicio.precio}</td>
      <td>
        <button onclick="editServicio('${servicio._id}', '${servicio.nombre}', '${servicio.descripcion}', ${servicio.precio})">
          Editar
        </button>
        <button onclick="deleteServicio('${servicio._id}')">
          Eliminar
        </button>
      </td>
    `;
    table.appendChild(row);
  });
}
// Guardar servicio
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    nombre: nombre.value,
    descripcion: descripcion.value,
    precio: Number(precio.value)
  };
  let url = '/api/servicios';
  let method = 'POST';

  if (serviceId.value) {
    url = `/api/servicios/${serviceId.value}`;
    method = 'PUT';
  }
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId
    },
    body: JSON.stringify(data)
  });
  const result = await res.json();
  mensaje.textContent = result.msg;

  resetForm();
  loadServicios();
});
// Editar servicio
function editServicio(id, nom, desc, prec) {
  serviceId.value = id;
  nombre.value = nom;
  descripcion.value = desc !== 'null' ? desc : '';
  precio.value = prec;
}
// Elimiar servicio
async function deleteServicio(id) {
  if (!confirm('¿Eliminar este servicio definitivamente?')) return;
  const res = await fetch(`/api/servicios/${id}`, {
    method: 'DELETE',
    headers: {
      'x-user-id': userId
    }
  });
  const result = await res.json();
  mensaje.textContent = result.msg;
  loadServicios();
}
// Limpiar
function resetForm() {
  serviceId.value = '';
  nombre.value = '';
  descripcion.value = '';
  precio.value = '';
}
// Iniciar
loadServicios();