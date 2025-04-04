const { Usuario, Tarea } = require('../models');

exports.listar = async (req, res) => {
    const usuarios = await Usuario.findAll({ include: Tarea });
    res.render('usuarios/index', {
        usuarios,
        error: req.query.error
    });
};

exports.formCrear = (req, res) => {
    res.render('usuarios/crear');
};

exports.crear = async (req, res) => {
    await Usuario.create(req.body);
    res.redirect('/usuarios');
};

exports.formEditar = async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.id);
    res.render('usuarios/editar', { usuario });
};

exports.editar = async (req, res) => {
    await Usuario.update(req.body, {
        where: { usu_id: req.params.id }
    });
    res.redirect('/usuarios');
};

exports.eliminar = async (req, res) => {
    try {
        await Usuario.destroy({ where: { usu_id: req.params.id } });
        res.redirect('/usuarios');
    } catch (error) {
        if (error.parent && error.parent.errno === 1451) { // Error de foreign key
            res.redirect('/usuarios?error=relacion');
        } else {
            res.redirect('/usuarios?error=desconocido');
        }
    }
};