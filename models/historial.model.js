const mongoose = require('mongoose');
const { Schema } = mongoose;

const historial = new Schema({
    estTramite: {type: String},
    area: { type: Schema.Types.ObjectId, ref: 'Area'},
    usuario: { type: Schema.Types.ObjectId, ref: 'Users'},
    tramite: { type: Schema.Types.ObjectId, ref: 'Tramite'}
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Historial', historial);