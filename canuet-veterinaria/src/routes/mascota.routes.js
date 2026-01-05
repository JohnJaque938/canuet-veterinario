const express = require('express');
const router = express.Router();
const mascotaController = require('../controllers/mascota.controller');

router.post('/', mascotaController.createMascota);
router.get('/mio', mascotaController.getMyMascotas);

module.exports = router;