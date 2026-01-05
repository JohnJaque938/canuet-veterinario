const Servicio = require('../models/servicio');

// Crear un servicio (ADMIN)
exports.createServicio = async (req, res) => {
  try {
    const servicio = new Servicio(req.body);
    await servicio.save();
    res.status(201).json({ msg: 'Servicio creado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al crear servicio' });
  }
};

// Ver los servicios (USER)
exports.getServicios = async (req, res) => {
  try {
    const servicios = await Servicio.find();
    res.json(servicios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al ver los servicios' });
  }
};
// Actualizar los servicios (ADMIN)
exports.updateServicio = async (req, res) => {
  try {
    const { id } = req.params;

    const servicio = await Servicio.findById(id);
    if (!servicio) {
      return res.status(404).json({ msg: 'El servicio no fue encontrado o no existe' });
    }

    await Servicio.findByIdAndUpdate(id, req.body);

    res.json({ msg: 'El servicio se ha actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar el servicio' });
  }
};
// Eliminar un servicio (ADMIN)
exports.deleteServicio = async (req, res) => {
  try {
    const { id } = req.params;

    const servicio = await Servicio.findById(id);
    if (!servicio) {
      return res.status(404).json({ msg: 'El Servicio no fue encontrado o no existe' });
    }
    await Servicio.findByIdAndDelete(id);
    res.json({ msg: 'El servicio fue eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al intentar eliminar el servicio' });
  }
};
