const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const usersCtrl = {}

usersCtrl.getAllUser = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

usersCtrl.createUser = async (req, res, next) => {
    const user = new User(req.body);
    user.password = await user.encryptPassword(user.password); 
    await user.save();
    /*console.log(user);*/
    const token = jwt.sign({ id: user._id }, 'mySecretToken', {  /*metodo sign: crea un token*/
        expiresIn: 60 * 60 * 24 /*sesion expira en 24hs*/
    });
    res.json({ auth: true, token });
};

usersCtrl.getUser = async (req, res, next) => {

    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({
            auth: false,
            messages: 'No tienes permiso para recibir este contenido'
        });
    }

    const decode = jwt.verify(token, 'mySecretToken'); /*Decodifica el token*/

    const user = await User.findById(decode.id, {password: 0});
    if (!user) {
        return res.status(404).json({
            auth: false,
            messages: 'Usuario no encontrado'
        });
    }
    res.json(user);
    /*const user = await User.findById(req.params.id);
    res.json(user);*/
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
    res.json(user);
};

usersCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndRemove(req.params.id);
    res.json({ status: 'Usuario Eliminado' });
};

module.exports = usersCtrl;