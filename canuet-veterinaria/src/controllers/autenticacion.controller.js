const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

// Registro del usuario
exports.registerUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const usuarioExists = await Usuario.findOne({ email });
    if (usuarioExists) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password: hashedPassword
    });

    await nuevoUsuario.save();

    res.status(201).json({
      msg: 'El usuario fue registrado correctamente'
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'El usuario no pudo ser creado correctamente'
    });
  }
};
// Inicio de sesión
exports.loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: 'Credenciales incorrectas' });
    }

    const esIgual = await bcrypt.compare(password, usuario.password);
    if (!esIgual) {
      return res.status(400).json({ msg: 'Credenciales incorrectas' });
    }

    res.json({
      msg: 'Login exitoso',
      userId: usuario._id,
      rol: usuario.rol,
      nombre: usuario.nombre
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'El usuario no pudo ser encontrado'
    });
  }
};
