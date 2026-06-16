const Publicacion = require('../../models/p3/publicacion.model');
const Empleado = require('../../models/p3/empleado.model');
const { Op } = require('sequelize');

const publicacionCtrl = {};

publicacionCtrl.getPublicaciones = async ( req, res ) => {
  try {
    const publicaciones = await Publicacion.findAll({
      include: [{
        model: Empleado,
        as: 'empleado',
        attributes: ['id', 'nombre', 'apellido', 'dni', 'email']
      }],
      order: [['fechaPublicacion', 'DESC']]
    });
    res.status(200).json(publicaciones);
  } catch (error) {
    res.status(400).json({
      status: '0',
      msg: 'Error al obtener las publicaciones'
    });
  }
};

publicacionCtrl.createPublicacion = async ( req, res ) => {
  try {
    const data = req.body;
    //Verifica empleado existe
    if(data.empleadoId) {
      const empleado = await Empleado.findByPk(data.empleadoId);
      if(!empleado){
        return res.status(404).json({
          status: '0',
          msg: 'El empleado no existe'
        });
      }
    }
    const nuevaPublicacion = await Publicacion.create(data);
    // Obtener publicacion con empleado
    const publicacionCompleta = await Publicacion.findByPk(nuevaPublicacion.id,{
      include: [{
        model: Empleado,
        as: 'empleado'
      }]
    });
    res.status(201).json({
      status: '1',
      msg: 'Publicacion creada correctamente',
      data: publicacionCompleta
    });
  } catch (error) {
    res.status(400).json({
      status: '0',
      msg: 'Error al crear la publicacion',
      error: error.message
    });
  }
};

publicacionCtrl.updatePublicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const publicacion = await Publicacion.findByPk(id);

    if(!publicacion) {
      return res.status(404).json({
        status: '0',
        msg: 'Publicacion no encontrada'
      });
    }

    await publicacion.update(req.body);
    const publicacionActualizada = await Publicacion.findByPk(id, {
      include: [{
        model: Empleado,
        as: 'empleado'
      }]
    });
    res.json({
      status: '1',
      msg: 'Publicacion actualizada correctamente',
      data: publicacionActualizada
    });
  } catch (error) {
    res.status(400).json({
      status: '0',
      msg: 'Error al actualizar la publicacion'
    });
  }
};

publicacionCtrl.getPublicacionesTituloVigencia = async (req, res) => {
  try {
    const { titulo, vigencia } = req.query;
    let where = {};

    if (titulo) {
      where.titulo = { [Op.iLike]: `%${titulo}%` };
    }
    
    if(vigencia !== undefined) {
      where.vigente = vigencia === 'true';
    }

    const publicaciones = await Publicacion.findAll({
      where,
      include: [{
        model: Empleado,
        as: 'empleado'
      }],
      order: [['fechaPublicacion', 'DESC']]
    });

    res.status(200).json(publicaciones);
  } catch (error) {
    res.status(404).json({
      status: '0',
      msg: 'Error al buscar publicacion'
    });
  }
};

publicacionCtrl.deletePublicacion = async ( req, res ) => {
  try {
    const { id } = req.params;
    const publicacion = await Publicacion.findByPk(id);

    if(!publicacion) {
      return res.status(404).json({
        status: '0',
        msg: 'Publicacion no encontrada'
      });
    }
    await publicacion.destroy(); //b logico
    res.json({
      status: '1',
      msg: 'Publicacion eliminada correctamente'
    });
  } catch (error) {
    res.status(400).json({
      status: '0',
      msg: 'Error al eliminar la publicacion'
    });
  }
};

publicacionCtrl.restorePublicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurado = await Publicacion.restore({ where: { id }});

    if(!restaurado) {
      return res.status(404).json({
        status: '0',
        msg: 'Publicacion no encontrada o no estaba eliminada'
      });
    }

    res.json({
      status: '1',
      msg: 'Publicacion restaurada exitosamente'
    });
  } catch (error) {
    res.status(400).json({
      status: '0',
      msg: 'Error al restaurar la publicacion'
    });
  }
};

module.exports = publicacionCtrl;
