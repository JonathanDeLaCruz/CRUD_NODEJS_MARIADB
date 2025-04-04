# Creando mi primer CRUD con NodeJS y MariaDB

🧰 Herramientas necesarias instaladas previamente:
Node.js y npm
Verifica con:
node -v
npm -v

MariaDB instalado y ejecutándose localmente
mysql -u TU_USUARIO -p

📁 1. Crear carpeta de proyecto
mkdir crud-node-mariadb
cd crud-node-mariadb

📦 2. Inicializar el proyecto y dependencias
npm init -y
npm install express sequelize mariadb ejs
(Opcional para desarrollo con autorecarga)
npm install --save-dev nodemon

🧬 3. Crear base de datos y tablas en MariaDB
CREATE DATABASE nodejs CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE nodejs;

CREATE TABLE usuario (
  usu_id INT AUTO_INCREMENT PRIMARY KEY,
  usu_nombre VARCHAR(50) NOT NULL,
  usu_paterno VARCHAR(50),
  usu_materno VARCHAR(50),
  usu_correo VARCHAR(100) NOT NULL,
  usu_activo TINYINT NOT NULL,
  usu_registro DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE tarea (
  tar_id INT AUTO_INCREMENT PRIMARY KEY,
  tar_titulo VARCHAR(150),
  tar_descripcion TEXT,
  tar_completado TINYINT,
  tar_limite DATE,
  tar_fkusuario INT,
  FOREIGN KEY (tar_fkusuario) REFERENCES usuario(usu_id)
);

🚀 5. Levantar el servidor
node app.js
O con nodemon si lo instalaste:
npx nodemon app.js
