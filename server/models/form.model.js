const mongoose = require('mongoose');
const { Schema } = mongoose();

const formsSchema = new Schema({

    apellido: { type: String, required: true },
    nombre: { type: String, required: true },
    apeCony: { type: String, required: true },
    nombCony: { type: String, required: true },
    nacionalidad: { type: String, required: true },
    estCivil: { type: String, required: true },
    ldni: { type: String, required: true, unique: true},
    cin: { type: String, required: true },
    policia: { type: String, required: true },
    pasaporte: { type: String, required: true },
    fechNac: { type: Date, required: true },
    nombSociedad: { type: String, required: true },
    domSociedad: { type: String, required: true },
    irpc: { type: String, required: true },
    asoCiv: { type: String, required: true },
    solicitante: { type: String, required: true },
    domicilio: { type: String, required: true },
    telefono: { type: String, required: true }

});

module.exports = mongoose.model('Forms', formsSchema);