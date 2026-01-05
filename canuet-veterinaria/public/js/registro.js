const form = document.getElementById('registroForm');
const mensaje = document.getElementById('mensaje');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('/api/autenticacion/registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, password })
    });

    const data = await res.json();

    mensaje.textContent = data.msg;
    mensaje.style.color = res.ok ? 'green' : 'red';

  } catch (err) {
    console.error(err);
    mensaje.textContent = 'Error de conexión';
    mensaje.style.color = 'red';
  }
});