const express = require('express');
const router = express.Router();
const transaccionCtrl = require('../../controllers/p2/transaccion.controller');

router.get('/', transaccionCtrl.getTransacciones);
// /api/transaccion/email?email= xxx
router.get('/email', transaccionCtrl.getTransaccionesEmail); 
// /api/transaccion/idioma/es-espaniol
router.get('/idioma/:idioma', transaccionCtrl.getTransaccionesIdioma); 
router.post('/', transaccionCtrl.createTransaccion);

module.exports = router;