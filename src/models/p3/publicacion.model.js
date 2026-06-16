const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');
const Empleado = require('./empleado.model');

const Publicacion = sequelize.define('Publicacion', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El titulo es obligatorio'
            },
            len: {
                args: [6, 40],
                msg: 'El titulo debe tener entre 6 y 40 caracteres'
            }
        }
    },
    contenido: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El contenido es obligatorio'
            },
            len: {
                args: [10, 5000],
                msg: 'El contenido debe tener al menos 10 caracteres'
            }
        }
    },
    imagenAsociada: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Debe proporcionar una imagen'
            }            
        }
    },
    fechaPublicacion: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La fecha de publicacion es obligatoria'
            }
        }
    },
    vigente: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'publicaciones',
    timestamps: true,
    paranoid: true // b logico
});

// 1 publicacion pertenece 1 empleado
Publicacion.belongsTo(Empleado,{
    as: 'empleado',
    foreignKey: 'empleadoId'
});

module.exports = Publicacion;

