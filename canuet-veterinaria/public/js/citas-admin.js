console.log('citas-admin.js cargado');

// Proteger Admin
const userId = localStorage.getItem('userId');
const rol = localStorage.getItem('rol');

if (!userId || rol !== 'ADMIN') {
  window.location.href = '/login.html';
}

const table = document.getElementById('appointmentsTable');
const mensaje = document.getElementById('mensaje');

// Formatear Fecha DD/MM/YYYY
function formatFechaChile(fechaISO) {
  const [anio, mes, dia] = fechaISO.split('-');
  return `${dia}-${mes}-${anio}`;
}
// Listar citas
async function loadCitas() {
  const res = await fetch('/api/citas', {
    headers: { 'x-user-id': userId }
  });
  const citas = await res.json();
  table.innerHTML = '';
  citas.forEach(app => {
    const row = document.createElement('tr');
    const fecha = app.fecha
      ? formatFechaChile(app.fecha)
      : '—';
    const horario = app.disponibilidad
      ? `${app.disponibilidad.horaInicio} - ${app.disponibilidad.horaFin}`
      : '—';
    row.innerHTML = `
      <td>${app.usuario?.nombre || '—'}</td>
      <td>${app.mascota?.nombre || '—'}</td>
      <td>${app.servicio?.nombre || '—'}</td>
      <td>${fecha}</td>
      <td>${horario}</td>
      <td>${app.estado}</td>
      <td>
        <button onclick="updateStatus('${app._id}', 'APROBADA')">Aprobar</button>
        <button onclick="updateStatus('${app._id}', 'CANCELADA')">Cancelar</button>
        <button onclick="deleteCita('${app._id}')">Eliminar</button>
      </td>
    `;
    table.appendChild(row);
  });
}

// Actualizar estado de la cita
async function updateStatus(id, estado) {
  const res = await fetch(`/api/citas/${id}/estado`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId
    },
    body: JSON.stringify({ estado })
  });
  const result = await res.json();
  mensaje.textContent = result.msg;
  loadAppointments();
}
// Eliminar cita
async function deleteCita(id) {
  if (!confirm('¿Estás seguro de eliminar esta cita?')) return;
  const res = await fetch(`/api/citas/${id}`, {
    method: 'DELETE',
    headers: { 'x-user-id': userId }
  });
  const result = await res.json();
  mensaje.textContent = result.msg;
  loadCitas();
}
// Iniciar
loadCitas();