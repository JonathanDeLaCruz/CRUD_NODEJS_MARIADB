const { Actividad, Tarea } = require('../models');
const fs = require('fs');
const path = require('path');

exports.listar = async (req, res) => {
  const actividades = await Actividad.findAll({ include: Tarea });
  res.render('actividades/index', { actividades });
};

exports.formCrear = async (req, res) => {
  const tareas = await Tarea.findAll();
  res.render('actividades/crear', { tareas });
};

exports.crear = async (req, res) => {
  const file = req.file ? req.file.filename : null;
  await Actividad.create({ ...req.body, act_evidencia: file });
  res.redirect('/actividades');
};

exports.formEditar = async (req, res) => {
  const actividad = await Actividad.findByPk(req.params.id);
  const tareas = await Tarea.findAll();
  res.render('actividades/editar', { actividad, tareas });
};

exports.editar = async (req, res) => {
  const actividad = await Actividad.findByPk(req.params.id);
  let nuevaEvidencia = actividad.act_evidencia;

  if (req.file) {
    if (actividad.act_evidencia) {
      const rutaVieja = path.join(__dirname, '../public/uploads/', actividad.act_evidencia);
      if (fs.existsSync(rutaVieja)) fs.unlinkSync(rutaVieja);
    }
    nuevaEvidencia = req.file.filename;
  }

  await Actividad.update({
    act_titulo: req.body.act_titulo,
    act_descripcion: req.body.act_descripcion,
    act_realizo: req.body.act_realizo,
    act_evidencia: nuevaEvidencia,
    act_fktarea: req.body.act_fktarea
  }, {
    where: { act_id: req.params.id }
  });

  res.redirect('/actividades');
};

exports.eliminar = async (req, res) => {
  const actividad = await Actividad.findByPk(req.params.id);
  if (actividad.act_evidencia) {
    const rutaArchivo = path.join(__dirname, '../public/uploads/', actividad.act_evidencia);
    if (fs.existsSync(rutaArchivo)) fs.unlinkSync(rutaArchivo);
  }
  await Actividad.destroy({ where: { act_id: req.params.id } });
  res.redirect('/actividades');
};
