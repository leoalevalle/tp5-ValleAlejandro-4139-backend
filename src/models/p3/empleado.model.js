const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const Empleado = sequelize.define('Empleado', {
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El apellido es requerido' }
    }
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El nombre es requerido' }
    }
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: { msg: 'Ya existe un empleado con ese DNI' },
    validate: {
      len: {
        args: [7, 8],
        msg: 'DNI debe tener entre 7 y 8 caracteres'
      },
      isNumeric: {
        msg: 'El DNI solo puede contener numeros'
      }
    }

  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: { msg: 'Ya existe un empleado con ese Email' },
    validate: {
      isEmail: { msg: 'Email invalido' }
    }
  }
}, {
  tableName: 'empleados',
  timestamps: true,
  paranoid: true // b logico

});

module.exports = Empleado;