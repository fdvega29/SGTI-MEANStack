const mongoose = require('mongoose');
const { Schema } = mongoose;

const tipoTramite = new Schema({
    formulario: {type: String},
    descripcion: {type: String},
    costo: {type: Number}
},
{
    timestamps: true
}
);

module.exports = mongoose.model('TipoTramite', tipoTramite);