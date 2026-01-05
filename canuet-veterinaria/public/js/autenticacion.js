console.log('autenticacion.js cargado');

const form = document.getElementById('loginForm');
const mensaje = document.getElementById('mensaje');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:3000/api/autenticacion/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      mensaje.textContent = data.msg;
      return;
    }
    // Guardar la sesión
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('rol', data.rol);
    localStorage.setItem('nombre', data.nombre);

    // Redireccionar según el rol del usuario
    if (data.rol === 'ADMIN') {
      window.location.href = '/admin-citas.html';
    } else {
      window.location.href = '/crear-cita.html';
    }

  } catch (error) {
    console.error(error);
    mensaje.textContent = 'Error al iniciar sesión';
  }
});