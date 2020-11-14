const mongoose = require('mongoose');
const { Schema } = mongoose;

const sincronizacionPago = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'Users'},
    totProcesados: {type: String},
    totActualizados: {type: String},
    fecha: {type: Date, default: Date.now}
},
{
    timestamps: true
}
);

module.exports = mongoose.model('SincronizacionPago', sincronizacionPago);