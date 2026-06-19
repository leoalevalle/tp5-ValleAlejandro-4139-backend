const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database');

const Local = sequelize.define('Local', {
    numerolocal: {
        type: DataTypes.STRING,
        allowNull: false
    },
    superficie: {
        type: DataTypes.STRING,
        allowNull: false
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName: 'locales',
    timestamps: true
});

module.exports = Local;