console.log('disponibilidad.js cargado');

// Proteger página
const userId = localStorage.getItem('userId');
const rol = localStorage.getItem('rol');

if (!userId || rol !== 'ADMIN') {
  alert('Acceso no autorizado');
  window.location.href = '/login.html';
}
const form = document.getElementById('disponibilidadForm');
const mensaje = document.getElementById('mensaje');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    fecha: document.getElementById('fecha').value,
    horaInicio: document.getElementById('horaInicio').value,
    horaFin: document.getElementById('horaFin').value
  };
  try {
    const res = await fetch('/api/disponibilidad', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': userId
      },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    mensaje.textContent = result.msg;
    if (res.ok) form.reset();
  } catch (error) {
    console.error(error);
    mensaje.textContent = 'Error al crear disponibilidad';
  }
});