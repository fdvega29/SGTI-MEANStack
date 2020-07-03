const mongoose = require('mongoose');
const { Schema } = mongoose;

const dataMinutaH = new Schema({
    apellido: { type: String},
    nombre: { type: String},
    estCivil: { type: String},
    tipoDoc: { type: String},
    numDoc: { type: String},
    nacionalidad: { type: String},
    fechNac: { type: String},
    apeConyu: { type: String, min: 3 },
    nomConyu: { type: String, min: 5 },
    tipoTram: {type: String},
    producto: {type: String},
    estadoTram: {type: String, default: 'Iniciado'},
    usuario: { type: Schema.Types.ObjectId, ref: 'Users'}

},
{
    timestamps: true
}
);

module.exports = mongoose.model('MinutaH', dataMinutaH);
