const mongoose = require('mongoose');
const { Schema } = mongoose;

const data = new Schema({
    apellido: { type: String, required: ['El apellido es requerido', true]},
    nombre: { type: String, required: ['El nombre es requerido', true]},
    estCivil: { type: String},
    tipoDoc: { type: String},
    numDoc: { type: String},
    nacionalidad: { type: String},
    fechNac: { type: String},
    apeConyu: { type: String, min: 3 },
    nomConyu: { type: String, min: 5 },
    domicilio: { type: String},
    objetoPedido: { type: String},
    ubicacionInmueble: { type: String},
    tipoTram: {type: String, required: true},
    producto: {type: String, required: true},
    estadoTram: {type: String, default: 'Iniciado'},
    usuario: { type: Schema.Types.ObjectId, ref: 'Users'}
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Tramite', data);
