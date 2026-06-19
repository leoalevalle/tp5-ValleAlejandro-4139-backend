const Local = require('../../models/p1/local.model');

const localCtrl = {};

localCtrl.createLocal = async (req, res) => {
    try {
        const nuevoLocal = await Local.create(req.body);
        res.status(201).json({
            status: '1',
            msg: 'Local creado exitosamente',
            data: nuevoLocal
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error al crear el local',
            error: error.message
        });
    }
};

module.exports = localCtrl;