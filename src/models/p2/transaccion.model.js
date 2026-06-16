const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const Transaccion = sequelize.define('Transaccion', {
    idiomaOrigen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    textoOrigen: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    idiomaDestino: {
        type: DataTypes.STRING,
        allowNull: false
    },
    textoDestino: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    emailCliente: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: 'Ya existe un cliente con ese Email' },
        validate: {
            isEmail: { msg: 'Email invalido' }
        }
    }
}, {
    tableName: 'transacciones',
    timestamps: true,
    paranoid: true // b logico
});

module.exports = Transaccion;