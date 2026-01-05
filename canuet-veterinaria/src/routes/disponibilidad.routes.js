const express = require('express');
const router = express.Router();

const disponibilidadController = require('../controllers/disponibilidad.controller');
const { autenticacionMiddleware } = require('../middlewares/autenticacion.middleware');
const { adminMiddleware } = require('../middlewares/rol.middleware');

// Solamente ADMIN 
router.post(
  '/',
  autenticacionMiddleware,
  adminMiddleware,
  disponibilidadController.createDisponibilidad
);

// Publico (para citas)
router.get('/', disponibilidadController.getDisponibilidades);

module.exports = router;