# Creando mi primer CRUD con NodeJS y MariaDB

🧰 Herramientas necesarias instaladas previamente:
Node.js y npm
Verifica con:
```js
node -v
npm -v
```

MariaDB instalado y ejecutándose localmente
```sql
mysql -u TU_USUARIO -p
```

📁 1. Crear carpeta de proyecto
```js
mkdir crud-node-mariadb
cd crud-node-mariadb
```

📦 2. Inicializar el proyecto y dependencias
```js
npm init -y
npm install express sequelize mariadb ejs
```
(Opcional para desarrollo con autorecarga)
```js
npm install --save-dev nodemon
```
🧬 3. Crear base de datos y tablas en MariaDB
```sql
CREATE DATABASASE nombre_base_datos;

USE nombre_base_datos;

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
```
🚀 5. Levantar el servidor
```js
node app.js
```
O con nodemon si lo instalaste:
```js
npx nodemon app.js
```

✨ 6. Subir archivos

- Agregar la nueva tabla de **Actividades**

```sql
CREATE TABLE actividad (
  act_id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  act_titulo varchar(150) NOT NULL,
  act_descripcion text NOT NULL,
  act_realizo date NOT NULL,
  act_evidencia varchar(150) NOT NULL,
  act_fktarea int(11) NOT NULL,
  FOREIGN KEY (act_fktarea) REFERENCES tarea (tar_id)
)
```

- Instalar dependencia para subir imágenes

```ts
npm install multer
```

- Es necesario tener creada la estructura de carpetas **public/uploads**