const express = require('express');
const router = express.Router();

const {
  createServicio,
  getServicios,
  updateServicio,
  deleteServicio
} = require('../controllers/servicio.controller');

const { autenticacionMiddleware } = require('../middlewares/autenticacion.middleware');
const { adminMiddleware } = require('../middlewares/rol.middleware');

// Usuarios listar los servicios activos
router.get('/', getServicios);
// Admin para crear el servicio
router.post(
  '/',
  autenticacionMiddleware,
  adminMiddleware,
  createServicio
);
// Admin actualizar o modificar el servicio
router.put(
  '/:id',
  autenticacionMiddleware,
  adminMiddleware,
  updateServicio
);
// Admin eliminar el servicio
router.delete(
  '/:id',
  autenticacionMiddleware,
  adminMiddleware,
  deleteServicio
);

module.exports = router;