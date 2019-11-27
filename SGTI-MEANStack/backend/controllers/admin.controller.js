const Admin = require('../models/admin.model');

const adminCtrl = {}

adminCtrl.getAllAdmin = async (req, res) => {
    const admin = await Admin.find();
    res.json(admin);
};

adminCtrl.createAdmin = async (req, res) => {
    const admin = new Admin(req.body);
    await admin.save();
    res.json({ 'status': 'Admin registrado con exito'});
};

adminCtrl.getAdmin = async (req, res) => {
    const admin = await Admin.findById(req.params.id);
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