const express = require('express');
const router = express.Router();
const socioCtrl = require('../../controllers/p1/socio.controller');

router.get('/', socioCtrl.getSocios);
// /api/socio/activo
router.get('/activo', socioCtrl.getSociosActivo);
router.post('/', socioCtrl.createSocio);
router.put('/:id', socioCtrl.updateSocio);
router.delete('/:id', socioCtrl.deleteSocio);
router.patch('/:id/restore', socioCtrl.restoreSocio); // cambia b logico

module.exports = router;