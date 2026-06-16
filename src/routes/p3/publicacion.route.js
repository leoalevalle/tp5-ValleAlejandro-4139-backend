const express = require('express');
const router = express.Router();
const publicacionCtrl = require('../../controllers/p3/publicacion.controller');

router.get('/', publicacionCtrl.getPublicaciones);
// /api/publicacion/buscar?titulo=hola&vigencia=true
router.get('/buscar', publicacionCtrl.getPublicacionesTituloVigencia); 
router.post('/', publicacionCtrl.createPublicacion);
router.put('/:id', publicacionCtrl.updatePublicacion);
router.delete('/:id', publicacionCtrl.deletePublicacion);
router.patch('/:id/restore', publicacionCtrl.restorePublicacion);

module.exports = router;