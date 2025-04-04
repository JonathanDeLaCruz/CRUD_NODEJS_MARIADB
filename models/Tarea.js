const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Usuario = require('./Usuario');

const Tarea = sequelize.define('tarea', {
  tar_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tar_titulo: DataTypes.STRING(150),
  tar_descripcion: DataTypes.TEXT,
  tar_completado: DataTypes.TINYINT,
  tar_limite: DataTypes.DATE,
  tar_fkusuario: {
    type: DataTypes.INTEGER,
    references: {
      model: 'usuario',
      key: 'usu_id'
    }
  }
}, {
  tableName: 'tarea',
  timestamps: false
});

// Relación con alias si quieres usar include
Usuario.hasMany(Tarea, { foreignKey: 'tar_fkusuario' });
Tarea.belongsTo(Usuario, { foreignKey: 'tar_fkusuario' });

module.exports = Tarea;