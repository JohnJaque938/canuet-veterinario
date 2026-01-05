exports.adminMiddleware = (req, res, next) => {
  if (!req.usuario) {
    return res.status(401).json({ msg: 'Usuario no autenticado' });
  }
  if (req.usuario.rol !== 'ADMIN') {
    return res.status(403).json({ msg: 'Acceso restringido a administradores' });
  }
  next();
};