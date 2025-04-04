const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define('usuario', {
  usu_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usu_nombre: DataTypes.STRING(50),
  usu_paterno: DataTypes.STRING(50),
  usu_materno: DataTypes.STRING(50),
  usu_correo: DataTypes.STRING(100),
  usu_activo: DataTypes.TINYINT,
  usu_registro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'usuario',
  timestamps: false
});

module.exports = Usuario;
