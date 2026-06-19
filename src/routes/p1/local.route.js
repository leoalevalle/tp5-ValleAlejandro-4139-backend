const express = require('express');
const router = express.Router();
const localCtrl = require('../../controllers/p1/local.controller');
const publicacionCtrl = require('../../controllers/p3/publicacion.controller');

router.post('/', localCtrl.createLocal);

module.exports = router;