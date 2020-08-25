const Area = require('../models/area.model');

const areaCtrl = {}

areaCtrl.getAllArea = async (req, res) => {
    const areas = await Area.find();
    return res.status(200).json({
        ok: true,
        area: areas,
        msg: 'Listado de areas'
    });
};

areaCtrl.createArea = async (req, res) => {
    const area = new Area(req.body);
    await area.save();
    return res.status(200).json({
        nuevaArea: area,
        msg: 'Nueva area cargada'
    });
}

areaCtrl.getAreaById = async (req, res) => {
    const area = await Area.findById(req.params.id);
    if(!area){
        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener area'
        });
    }
    return res.status(200).json({
        data: area
    });
}

areaCtrl.editArea = async (req, res) => {
    const { id } = req.params;
    const area = {
        nombre: req.body.nombre,
        encargado: req.body.encargado
    }
    await Area.findByIdAndUpdate(id, { $set: area }, { new: true });
    return res.status(200).json({
        data: area,
        msg: 'Area actualizada correctamente'
    })
    res.json(area);
    //res.json({'status': 'Informacion actualizada'});    
}

areaCtrl.deleteArea = async (req, res) => {
    await Area.findByIdAndRemove(req.params.id);
    res.json({ 'status': 'Area eliminada correctamente' });
}

module.exports = areaCtrl;