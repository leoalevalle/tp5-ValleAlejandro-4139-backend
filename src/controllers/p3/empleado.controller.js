const Empleado = require('../../models/p3/empleado.model');

const empleadoCtrl = {};

empleadoCtrl.getEmpleados = async (req, res) => {
    try {
        const empleados = await Empleado.findAll({
            order: [['apellido', 'ASC']]
        });
        res.status(200).json(empleados);
    } catch (error) {
        res.status(400).json({
            status:'0',
            msg: 'Error al obtener los empleados'
        });
    }
};
// get empleado por id
empleadoCtrl.getEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const empleado = await Empleado.findByPk(id);

        if(!empleado) {
            return res.status(404).json({
                status: '0',
                msg: 'Empleado no encontrado'
            });
        }

        res.status(200).json(empleado);
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error al obtener el empleado'
        });
    }
};

empleadoCtrl.createEmpleado = async (req, res) => {
    try {
        const nuevoEmpleado = await Empleado.create(req.body);
        res.status(201).json({
            status: '1',
            msg: 'Empleado creado correctamente',
            data: nuevoEmpleado
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error al crear el empleado'
        });
    }
};

empleadoCtrl.deleteEmpleado = async ( req, res ) => {
    try {
        const { id } = req.params;
        const empleado = await Empleado.findByPk(id);

        if(!empleado) {
          return res.status(404).json({
            status: '0',
            msg: 'Empleado no encontrado'
          });
        }
        await empleado.destroy(); // b logico
        res.json({
          status: '1',
          msg: 'Empleado eliminado correctamente'
        });
    } catch (error) {
      res.status(400).json({
        status: '0',
        msg: 'Error al eliminar el empleado'
      });
    }
};

empleadoCtrl.restoreEmpleado = async ( req, res ) => {
  try {
    const { id } = req.params;
    const restaurado = await Empleado.restore({ where: { id }});

    if(!restaurado) {
      return res.status(404).json({
        status: '0',
        msg: 'Empleado no encontrado o no estaba eliminado'
      });
    }

    res.json({
      status: '1',
      msg: 'Empleado restaurado exitosamente'
    });
  } catch (error) {
    res.status(400).json({
      status: '0',
      msg: 'Error al restaurar el empleado'
    });
  }
};

module.exports = empleadoCtrl;