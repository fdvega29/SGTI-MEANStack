const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const usersCtrl = {}

usersCtrl.getUser = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({
            ok: false,
            message: "Error al obtener usuario por id"
        });
    }
    const user = await User.findById(id);
    res.status(200).json({
        ok: true,
        usuario: user
    });
};

usersCtrl.getAllUser = async (req, res) => {

    const [users, total] = await Promise.all([
        User.find({}, 'apellido nombre email telefono img roles google'),
        
        User.countDocuments()
    ]);

    if (!users) {
        return res.status(400).json({
            ok: false,
            message: 'Error al obtener usuarios'
        });
    }

    return res.status(200).json({
        ok: true,
        usuarios: users,
        total: JSON.stringify(total)
    });
};

usersCtrl.editUser = async (req, res) => {
    const dataUser = {
        apellido: req.body.apellido,
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        email: req.body.email,
        img: req.body.img,
        roles: req.body.roles
    }
    if (!dataUser) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Error al obtener datos del usuario'
        });
    }
    await User.findByIdAndUpdate(req.params.id, { $set: dataUser }, { new: true });
    return res.status(200).json({
        ok: true,
        usuario: dataUser,
        message: "Usuario actualizado correctamente"
    })
};

usersCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndRemove(req.params.id);
    return res.status(200).json({
        ok: true,
        message: 'Usuario Eliminado'
    });
};

module.exports = usersCtrl;