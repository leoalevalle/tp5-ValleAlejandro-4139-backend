const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');
const Local = require('./local.model');

const Socio = sequelize.define('Socio', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'El nombre es requerido' }
        }
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'El apellido es requerido' }
        }
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: { msg: 'La foto debe ser una URL valida' }
        }
    },
    dni: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: 'Ya existe un socio con ese DNI' },
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
    numeroSocio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: { msg: 'Ya existe un socio con ese numero' },
        validate: {
            min: { args: [1], msg: 'Numero de socio debe ser mayor a 0' }
        }
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'socios',
    timestamps: true,
    paranoid: true // logico   

});

Socio.belongsTo(Local, { foreignKey: 'localId', as: 'local' });
Local.hasOne(Socio, { foreignKey: 'localId', as: 'socio' });

module.exports = Socio;