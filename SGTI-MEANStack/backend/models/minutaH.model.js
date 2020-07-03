const mongoose = require('mongoose');
const { Schema } = mongoose;

const dataMinutaH = new Schema({
    apellido: { type: String, required: ['El apellido es requerido', true]},
    nombre: { type: String, required: ['El nombre es requerido', true]},
    estCivil: { type: String},
    tipoDoc: { type: String, required: true},
    numDoc: { type: String, required: true},
    nacionalidad: { type: String, required: true},
    fechNac: { type: String, required: true},
    apeConyu: { type: String, min: 3 },
    nomConyu: { type: String, min: 5 },
    tipoTram: {type: String, required: true},
    producto: {type: String, required: true},
    estadoTram: {type: String, default: 'Iniciado'},
    usuario: { type: Schema.Types.ObjectId, ref: 'Users'}
},
{
    timestamps: true
}
);

module.exports = mongoose.model('MinutaH', dataMinutaH);
