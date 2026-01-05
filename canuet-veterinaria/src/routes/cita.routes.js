const express = require('express');
const router = express.Router();

const {
  createCita,
  getCitas,
  updateCitaStatus,
  deleteCita
} = require('../controllers/cita.controller');

const { autenticacionMiddleware } = require('../middlewares/autenticacion.middleware');
const { adminMiddleware } = require('../middlewares/rol.middleware');

// Usuario para crear cita
router.post(
  '/',
  autenticacionMiddleware,
  createCita
);
// Admin para listar todas las citas
router.get(
  '/',
  autenticacionMiddleware,
  adminMiddleware,
  getCitas
);
// Admin para aprobar o cancelar cita
router.put(
  '/:id/estado',
  autenticacionMiddleware,
  adminMiddleware,
  updateCitaStatus
);
// Admin para eliminar cita
router.delete(
  '/:id',
  autenticacionMiddleware,
  adminMiddleware,
  deleteCita
);

module.exports = router;