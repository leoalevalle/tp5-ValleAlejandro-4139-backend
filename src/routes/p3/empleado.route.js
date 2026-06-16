const express = require('express');
const router = express.Router();
const empeladoCtrl = require('../../controllers/p3/empleado.controller');
const empleadoCtrl = require('../../controllers/p3/empleado.controller');

router.get('/', empleadoCtrl.getEmpleados);
router.get('/:id', empleadoCtrl.getEmpleado);
router.post('/', empeladoCtrl.createEmpleado);
router.delete('/:id', empleadoCtrl.deleteEmpleado);
router.patch('/:id/restore', empleadoCtrl.restoreEmpleado);

module.exports = router;