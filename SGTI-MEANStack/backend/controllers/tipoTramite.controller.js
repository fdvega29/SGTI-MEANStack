const tipoTram = require('../models/tipoTramite');

const tipoTramCtrl = {}

tipoTramCtrl.getAllTipoTram = async (req, res) => {
    const tipoTramite = await tipoTram.find();
    return res.status(200).json({
        ok: true,
        data: tipoTramite,
        msg: 'Listado de areas'
    });
};

tipoTramCtrl.createTipoTram = async (req, res) => {
    const tipoTramite = new tipoTram(req.body);
    await tipoTramite.save();
    return res.status(200).json({
        nuevaArea: tipoTramite,
        msg: 'Nueva area cargada'
    });
}

tipoTramCtrl.getTipoTramById = async (req, res) => {
    const tipoTramite = await tipoTram.findById(req.params.id);
    if(!tipoTramite){
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener area'
        });
    }
    return res.status(200).json({
        data: tipoTramite
    });
}

tipoTramCtrl.editTipoTram = async (req, res) => {
    const { id } = req.params;
    const tipoTramite = {
        formulario: req.body.formulario,
        descripcion: req.body.descripcion,
        costo: req.body.costo
    }
    await tipoTram.findByIdAndUpdate(id, { $set: tipoTramite }, { new: true });
    return res.status(200).json({
        data: tipoTramite,
        msg: 'Area actualizada correctamente'
    }) 
}

tipoTramCtrl.deleteTipoTram = async (req, res) => {
    await tipoTram.findByIdAndRemove(req.params.id);
    res.json({ 'status': 'Area eliminada correctamente' });
}

module.exports = tipoTramCtrl;