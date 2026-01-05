const Cita = require('../models/cita');
const Disponibilidad = require('../models/disponibilidad');

// Crear una cita (USER)
exports.createCita = async (req, res) => {
  try {
    const usuario = req.headers['x-user-id'];

    if (!usuario) {
      return res.status(401).json({ msg: 'Usuario no autenticado' });
    }

    const { mascota, servicio, disponibilidad } = req.body;

    // Verificar la disponibilidad de la cita
    const disponibilidadExiste = await Disponibilidad.findById(disponibilidad);

    if (!disponibilidadExiste || !disponibilidadExiste.disponible) {
      return res.status(400).json({ msg: 'La disponibilidad no está disponible' });
    }

    // Crear cita
    const cita = new Cita({
      usuario,
      mascota,
      servicio,
      disponibilidad,
      fecha: disponibilidadExiste.fecha
    });

    await cita.save();

    // Bloquear la disponibilidad
    await Disponibilidad.findByIdAndUpdate(disponibilidad, {
      disponible: false
    });

    res.status(201).json({ msg: 'La cita fue solicitada correctamente' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al crear la cita' });
  }
};
// Cambiar o actualizar una cita (ADMIN)
exports.updateCitaStatus = async (req, res) => {
  try {
    const { estado } = req.body;
    const { id } = req.params;

    if (!['APROBADA', 'CANCELADA'].includes(estado)) {
      return res.status(400).json({ msg: 'Estado no válido' });
    }

    const cita = await Cita.findById(id);

    if (!cita) {
      return res.status(404).json({ msg: 'La cita no fue encontrada' });
    }

    cita.estado = estado;
    await cita.save();

    // Si se cancela, liberar la disponibilidad
    if (estado === 'CANCELADA') {
      await Disponibilidad.findByIdAndUpdate(cita.disponibilidad, {
        disponible: true
      });
    }

    res.json({ msg: `La cita fue ${estado.toLowerCase()} correctamente` });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar el estado de la cita' });
  }
};
// Listar todas las citas (ADMIN)
exports.getCitas = async (req, res) => {
  try {
    const citas = await Cita.find()
      .populate('usuario', 'nombre email')
      .populate('mascota', 'nombre')
      .populate('servicio', 'nombre')
      .populate('disponibilidad');

    res.json(citas);

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener las citas' });
  }
};
// Eliminar las citas (ADMIN)
exports.deleteCita = async (req, res) => {
  try {
    const cita = await Cita.findById(req.params.id);

    if (!cita) {
      return res.status(404).json({ msg: 'La cita no fue encontrada' });
    }

    // Liberar la disponibilidad
    await Disponibilidad.findByIdAndUpdate(cita.disponibilidad, {
      disponible: true
    });

    await cita.deleteOne();

    res.json({ msg: 'La cita fue eliminada correctamente' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al eliminar la cita' });
  }
};