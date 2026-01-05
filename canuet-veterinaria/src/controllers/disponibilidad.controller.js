const Disponibilidad = require('../models/disponibilidad');

// Crear una disponibilidad (ADMIN)
exports.createDisponibilidad = async (req, res) => {
  try {
    const disponibilidad = new Disponibilidad(req.body);
    await disponibilidad.save();
    res.status(201).json({ msg: 'La disponibilidad fue creada correctamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear la disponibilidad', error });
  }
};
// Obtener o ver las disponibilidades activas
exports.getDisponibilidades = async (req, res) => {
  try {
    const disponibilidades = await Disponibilidad.find({ disponible: true });
    res.json(disponibilidades);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener las disponibilidades', error });
  }
};