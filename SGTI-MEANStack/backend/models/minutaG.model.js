const mongoose = require('mongoose');
const { Schema } = mongoose;

const dataMinutaG = new Schema({
    apellido: { type: String},
    nombre: { type: String},
    estCivil: { type: String},
    numDoc: { type: String},
    domicilio: { type: String},
    objetoPedido: { type: String},
    ubicacionInmueble: { type: String},
    tipoTram: { type: String},
    producto: { type: String},
    estadoTram: { type: String, default: 'Iniciado'},
    usuario: { type: Schema.Types.ObjectId, ref: 'Users'}
  },
  {
    timestamps: true
  }
);


module.exports = mongoose.model('MinutaG', dataMinutaG);
