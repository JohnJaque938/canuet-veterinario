const Mascota = require('../models/mascota');

// Crear una mascota
exports.createMascota = async (req, res) => {
  try {
    const userId = req.headers['x-user-id'];

    if (!userId) {
      return res.status(401).json({ msg: 'Usuario no autenticado' });
    }

    const { nombre, especie, raza, edad } = req.body;

    const mascota = new Mascota({
      nombre,
      especie,
      raza,
      edad,
      propietario: userId
    });

    await mascota.save();

    res.status(201).json({ msg: 'La mascota fue creada correctamente' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al crear la mascota' });
  }
};

// Ver o listar las mascotas del usuario
exports.getMyMascotas = async (req, res) => {
  try {
    const userId = req.headers['x-user-id'];

    if (!userId) {
      return res.status(401).json({ msg: 'Usuario no autenticado' });
    }

    const mascotas = await Mascota.find({ propietario: userId });

    res.json(mascotas);

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al listar las mascotas' });
  }
};