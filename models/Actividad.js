const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Tarea = require('./Tarea');

const Actividad = sequelize.define('actividad', {
  act_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  act_titulo: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  act_descripcion: {
    type: DataTypes.TEXT
  },
  act_realizo: {
    type: DataTypes.DATE,
    allowNull: false
  },
  act_evidencia: {
    type: DataTypes.STRING(150)
  },
  act_fktarea: {
    type: DataTypes.INTEGER,
    references: {
      model: 'tarea',
      key: 'tar_id'
    }
  }
}, {
  tableName: 'actividad',
  timestamps: false
});

// Relación con tarea
Tarea.hasMany(Actividad, { foreignKey: 'act_fktarea' });
Actividad.belongsTo(Tarea, { foreignKey: 'act_fktarea' });

module.exports = Actividad;