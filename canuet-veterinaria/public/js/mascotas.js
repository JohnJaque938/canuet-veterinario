const userId = localStorage.getItem('userId');

if (!userId) {
  alert('Debes iniciar sesión');
  window.location.href = 'login.html';
}

document.getElementById('petForm').addEventListener('submit', async e => {
  e.preventDefault();

  const data = {
    nombre: nombre.value,
    especie: especie.value,
    raza: raza.value,
    edad: edad.value
  };

  const res = await fetch('/api/mascotas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  alert(result.msg);

  if (res.ok) {
    window.location.href = 'crear-cita.html';
  }
});