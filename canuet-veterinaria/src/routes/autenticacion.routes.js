const express = require('express');
const router = express.Router();
const autenticacionController = require('../controllers/autenticacion.controller');

router.post('/registro', autenticacionController.registerUsuario);
router.post('/login', autenticacionController.loginUsuario);

module.exports = router;