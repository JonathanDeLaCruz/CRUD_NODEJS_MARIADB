const { Tarea, Usuario } = require('../models');

exports.listar = async (req, res) => {
    const tareas = await Tarea.findAll({ include: Usuario });
    // Formatear fecha como string YYYY-MM-DD
    const tareasFormateadas = tareas.map(t => {
        return {
            ...t.get(),
            tar_limite: t.tar_limite ? new Date(t.tar_limite).toISOString().slice(0, 10) : null
        };
    });
    res.render('tareas/index', { tareas: tareasFormateadas });
};


exports.formCrear = async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.render('tareas/crear', { usuarios });
};

exports.crear = async (req, res) => {
    await Tarea.create(req.body);
    res.redirect('/tareas');
};

exports.formEditar = async (req, res) => {
    const tarea = await Tarea.findByPk(req.params.id);
    const usuarios = await Usuario.findAll();
    res.render('tareas/editar', { tarea, usuarios });
};

exports.editar = async (req, res) => {
    await Tarea.update(req.body, {
        where: { tar_id: req.params.id }
    });
    res.redirect('/tareas');
};

exports.eliminar = async (req, res) => {
    await Tarea.destroy({ where: { tar_id: req.params.id } });
    res.redirect('/tareas');
};