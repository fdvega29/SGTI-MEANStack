const Admin = require('../models/admin.model');
const jwt = require('jsonwebtoken');

const adminCtrl = {}

adminCtrl.getAllAdmin = async (req, res) => {
    const admin = await Admin.find();
    res.json(admin);
};

adminCtrl.createAdmin = async (req, res, next) => {
    const admin = new Admin(req.body);
    admin.password = await admin.encryptPassword(admin.password); 
    await admin.save();
    const token = jwt.sign({ id:admin._id}, 'mySecretTokenAdmin', {
        expiresIn: 60 * 60 * 24
    });
    res.json({ auth: true, token });
};

adminCtrl.getAdmin = async (req, res, next) => {
    
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({
            auth: false,
            messages: 'No tienes permiso para recibir este contenido'
        });
    }

    const decode = jwt.verify(token, 'mySecretTokenAdmin');

    const admin = await Admin.findById(decode.id, {password: 0});
    if (!admin) {
        return res.status(404).json({
            auth: false,
            messages: 'Admi no encontrado'
        });
    }
    res.json(admin);
};

adminCtrl.editAdmin = async (req, res) => {
    const { id } = req.params;
    const admin = {
        usuario: req.body.usuario,
        email: req.body.email,
        password: req.body.password
    }
    await Admin.findByIdAndUpdate(id, { $set: admin }, {new: true});
    res.json({ 'status': 'Admin actualizado'});
};

adminCtrl.deleteAdmin = async (req, res) => {
    await Admin.findByIdAndRemove(req.params.id);
    res.json({ status: 'Admin eliminado'});
};

module.exports = adminCtrl;