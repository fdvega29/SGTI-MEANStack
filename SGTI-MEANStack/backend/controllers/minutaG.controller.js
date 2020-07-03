const minutaG = require('../models/minutaG.model');

const dataCtrl = {};

dataCtrl.getAllDataG = async (req, res) => {
    const dataAll = await minutaG.find()
                                 .populate('usuario', 'apellido nombre telefono');
    if(!dataAll){
      return res.status(400).json({
          ok: false,
          message: 'Error al obtener listado de trámites'
      })
    }
    return res.status(200).json({
        ok: true,
        allDataMinG: dataAll
    });
};

dataCtrl.getDataG = async (req, res) => {
  const id = req.params.id;
  if(!id){
      return res.status(400).json({
          ok: false,
          message: 'Error al obtener datos del trámite'
      })
  }
  const dataMinG = await minutaG.findById(id);
  return res.status(200).json({
      ok: true,
      dataMinG: dataMinG
  })

};

dataCtrl.createTramG = async (req, res) => {
    const formData = new minutaG(req.body);
    if (!formData){
        return res.status(400).json({
            ok:false,
            message: 'Error al grabar información de minuta G'
        })
    }
    await formData.save();
    return res.status(200).json({
        ok: true,
        data: formData,
        message: 'Trámite cargado de forma correcta'
    })
};

dataCtrl.editDataG = async (req, res) => {
    const dataMinG = req.body;
    if(!dataMinG) {
        return res.status(400).json({
            ok: false,
            message: 'Error al obtener datos del trámite'
        });
    }
  await minutaG.findByIdAndUpdate(req.params.id, { $set: dataMinG }, { new: true});
      return res.status(200).json({
        ok: true,
        minutaG: dataMinG,
        message: "Información actualizada correctamente"
      })
};

dataCtrl.deleteDataG = async (req, res) => {
    await minutaG.findByIdAndDelete(req.params.id);
    return res.status(200).json({
        ok: true,
        message: 'Trámite elimnado'
    });
};

module.exports = dataCtrl;
