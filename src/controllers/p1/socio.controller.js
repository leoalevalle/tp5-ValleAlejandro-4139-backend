const Socio = require('../../models/p1/socio.model');
const { Op } = require('sequelize');

const socioCtrl = {};

socioCtrl.getSocios = async (req, res) => {
    try {
        const socios = await Socio.findAll({
            order:[['apellido', 'ASC']]
        });
        res.status(200).json(socios);
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error al obtener los socios',
            error: error.message
        });
    }
};

socioCtrl.getSociosActivo = async (req, res) => {
    try {
        const socios = await Socio.findAll({
            where: {activo: true },
            order: [['apellido', 'ASC']]
        });
        res.status(200).json(socios);
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error al obtener los socios activos'            
        });
    }
};

socioCtrl.createSocio = async (req, res) => {
    try {
        const nuevoSocio = await Socio.create(req.body);
        res.status(201).json({
            status: '1',
            msg: 'Socio creado exitosamente',
            data: nuevoSocio
        });        
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error al crear el socio',
            error: error.message
        });
    } 
};

socioCtrl.updateSocio = async (req, res) => {
    try {
        const { id } = req.params;
        const socio = await Socio.findByPk(id);

        if(!socio) {
            return res.status(404).json({
                status: '0',
                msg: 'Socio no encontrado'
            });
        }
        await socio.update(req.body);
        res.json({
            status: '1',
            msg: 'Socio actualizado correctamente'
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error al actualizar socio'
        });
    }
};

socioCtrl.deleteSocio = async (req, res) => {
    try {
        const { id } = req.params;
        const socio = await Socio.findByPk(id);

        if(!socio) {
            return res.status(404).json({
                status: '0',
                msg: 'Socio no encontrado'
            });
        }
        await socio.destroy(); // b logico
        res.json({
            status: '1',
            msg: 'Socio eliminado correctamente'
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error al eliminar el socio'
        });
    }
};

socioCtrl.restoreSocio = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurado = await Socio.restore({ where: { id }});

        if(!restaurado) {
            return res.status(404).json({
                status: '0',
                msg: 'Socio no encontrado o no estaba eliminado'
            });
        }
        res.json({
            status: '1',
            msg: 'Socio restaurado exitosamente'
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error  al restaurar el socio'
        });
    }
};

module.exports = socioCtrl;

