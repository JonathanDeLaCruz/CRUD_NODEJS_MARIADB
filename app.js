const express = require('express');
const app = express();
const path = require('path');
const sequelize = require('./config/db');

// Rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const tareaRoutes = require('./routes/tareaRoutes');
const actividadRoutes = require('./routes/actividadRoutes');

// Configuración
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Archivos estáticos (si usas CSS o JS extra)
app.use(express.static(path.join(__dirname, 'public')));

// Usar rutas
app.use('/usuarios', usuarioRoutes);
app.use('/tareas', tareaRoutes);
app.use('/actividades', actividadRoutes);

// Ruta raíz opcional
app.get('/', (req, res) => {
  res.redirect('/usuarios'); // Redirige a /usuarios por defecto
});

// Conexión a la base de datos y arranque del servidor
sequelize.sync({ force: false }) // Cambia a true solo para desarrollo
  .then(() => {
    console.log('✅ Base de datos conectada y sincronizada');
    app.listen(3000, () => {
      console.log('🚀 Servidor corriendo en http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('❌ Error al conectar a la base de datos:', err);
  });