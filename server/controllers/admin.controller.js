const Admin = require('../models/admin.model');
const adminCtrl = {};

adminCtrl.getAdmin = async (req, res) => {
    const admin = await Admin.findById(req.params.id);
    res.json(admin);
};

adminCtrl.createAdmin = async (req, res) => {
    const admin = Admin(req.body);
    await admin.save();
    res.json({ status: 'Administrador creado con exito' });
};

adminCtrl.editAdmin = async (req, res) => {
    const { id } = req.params;
    const admin = {
        user: req.body.user,
        password: req.body.password
    };
    await Admin.findByIdAndUpdate(id, { $set: admin }, { new: true });
    res.json({ status: 'Informacion actualizada' });
};

adminCtrl.deleteAdmin = async (req, res) => {
    await Admin.findByIdAndRemove(req.params.id);
    res.json({ status: 'Cuenta Eliminada' });
};

module.exports = adminCtrl;