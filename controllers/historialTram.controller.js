const historialTram = require('../models/historial.model');

const historialTramCtrl = {}

historialTramCtrl.getAllHistorial = async (req, res) => {
    const historial_Tram = await historialTram.find();
    return res.status(200).json({
        ok: true,
        data: historial_Tram,
        msg: 'Historial tramite'
    });
};

historialTramCtrl.createHistorial = async (req, res) => {
    console.log(req.body);
    const historial_Tram = new historialTram(req.body);
    await historial_Tram.save();
    return res.status(200).json({
        nuevaHistorial: historial_Tram,
        msg: 'Nuevo dato almacenado'
    });
}

historialTramCtrl.getHistorialById = async (req, res) => {
    const historial_Tram = await historialTram.findById(req.params.id);
    if(!historial_Tram){
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener dato'
        });
    }
    return res.status(200).json({
        data: historial_Tram
    });
}

historialTramCtrl.getAllDataById = async (req, res) => {
    const _id = req.params.id;
    const data = await historialTram.find({'tramite': _id})
    .populate('usuario', 'apellido nombre telefono')
    .populate('area', 'nombre')
    .sort({_id:-1});
    if (!data) {
        return res.status(400).json({
            ok: false,
            message: 'Error al obtener historial del tramite'
        })
    }

    return res.status(200).json({
        ok: true,
        historialTramite: data
    });
};

historialTramCtrl.editHistorial = async (req, res) => {
    const { id } = req.params;
    const historial_Tram = {
        formulario: req.body.nombre,
        descripcion: req.body.encargado,
        costo: req.body.costo
    }
    await historialTram.findByIdAndUpdate(id, { $set: historial_Tram }, { new: true });
    return res.status(200).json({
        data: historial_Tram,
        msg: 'Historial actualizada correctamente'
    }) 
}

historialTramCtrl.deleteHistorial = async (req, res) => {
    await historialTram.findByIdAndRemove(req.params.id);
    res.json({ 'status': 'Historial eliminada correctamente' });
}

module.exports = historialTramCtrl;