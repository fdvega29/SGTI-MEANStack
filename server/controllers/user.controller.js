const User = require('../models/user.model');

const usersCtrl = {}

usersCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

usersCtrl.createUser = async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json({ 'status': 'Usuario registrado con exito' });
};

usersCtrl.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
};

usersCtrl.editUser = async (req, res) => {
    const { id } = req.params;
    const user = {
        apellido: req.body.apellido,
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        email: req.body.email,
        password: req.body.password
    }
    await User.findByIdAndUpdate(id, { $set: user }, { new: true });
    res.json({ 'status': 'Usuario actualizado' });
};

usersCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndRemove(req.params.id);
    res.json({ status: 'Usuario Eliminado' });
};

module.exports = usersCtrl;