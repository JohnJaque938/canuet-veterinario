const Usuario = require('../models/usuario');

exports.autenticacionMiddleware = async (req, res, next) => {
  try {
    const userId = req.header('x-user-id');

    if (!userId) {
      return res.status(401).json({ msg: 'Acceso no autorizado' });
    }

    const usuario = await Usuario.findById(userId).select('-password');

    if (!usuario) {
      return res.status(401).json({ msg: 'Usuario no válido' });
    }

    req.usuario = usuario;
    next();

  } catch (error) {
    res.status(500).json({ msg: 'Error de autenticación' });
  }
};