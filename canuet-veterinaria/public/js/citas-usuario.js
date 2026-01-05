console.log('citas-usuario.js cargado');
// Proteger la página
const userId = localStorage.getItem('userId');
if (!userId) {
  window.location.href = '/login.html';
}
// Elementos del DOM
const seleccionarMascota = document.getElementById('seleccionarMascota');
const seleccionarServicio = document.getElementById('seleccionarServicio');
const seleccionarDisponibilidad = document.getElementById('seleccionarDisponibilidad');
const mensaje = document.getElementById('mensaje');
const form = document.getElementById('citaForm');
// Formatear fecha chilena DD-MM-YYYY
function formatFechaChile(fecha) {
  const [year, month, day] = fecha.split('-');
  return `${day}-${month}-${year}`;
}
// Listar las mascotas del usuario
async function loadMascotas() {
  const res = await fetch('/api/mascotas/mio', {
    headers: { 'x-user-id': userId }
  });
  const mascotas = await res.json();
  seleccionarMascota.innerHTML = '<option value="">Seleccione Mascota</option>';
  mascotas.forEach(mascota => {
    const option = document.createElement('option');
    option.value = mascota._id;
    option.textContent = mascota.nombre;
    seleccionarMascota.appendChild(option);
  });
}
// Listar los servicios (ARREGLADO)
async function loadServicios() {
  const res = await fetch('/api/servicios');
  const servicios = await res.json();

  seleccionarServicio.innerHTML = '<option value="">Seleccione Servicio</option>';

  servicios.forEach(servicio => {
    const option = document.createElement('option');
    option.value = servicio._id;
    option.textContent = servicio.nombre;
    seleccionarServicio.appendChild(option);
  });
}
// Listar horarios disponibles
async function loadDisponibilidad() {
  const res = await fetch('/api/disponibilidad');
  const disponibilidad = await res.json();

  seleccionarDisponibilidad.innerHTML = '<option value="">Seleccione Horario</option>';

  disponibilidad.forEach(item => {
    if (item.disponible) {
      const option = document.createElement('option');
      option.value = item._id;
      option.textContent = `${formatFechaChile(item.fecha)} | ${item.horaInicio} - ${item.horaFin}`;
      seleccionarDisponibilidad.appendChild(option);
    }
  });
}
// Enviar cita
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    mascota: seleccionarMascota.value,
    servicio: seleccionarServicio.value,
    disponibilidad: seleccionarDisponibilidad.value
  };

  try {
    const res = await fetch('/api/citas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': userId
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    mensaje.textContent = result.msg;

    if (res.ok) {
      form.reset();
      loadDisponibilidad();
    }

  } catch (error) {
    console.error(error);
    mensaje.textContent = 'Error al crear la cita';
  }
});

// Inicializar
loadMascotas();
loadServicios();
loadDisponibilidad();