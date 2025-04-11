const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/actividadController');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    const name = Date.now() + path.extname(file.originalname);
    cb(null, name);
  }
});
const upload = multer({ storage });

router.get('/', ctrl.listar);
router.get('/crear', ctrl.formCrear);
router.post('/crear', upload.single('act_evidencia'), ctrl.crear);
router.get('/editar/:id', ctrl.formEditar);
router.post('/editar/:id', upload.single('act_evidencia'), ctrl.editar);
router.get('/eliminar/:id', ctrl.eliminar);

module.exports = router;