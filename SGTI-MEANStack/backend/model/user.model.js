const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Definir un Schema
let userSchema = new Schema({
    apellido: { type: String, required: true, min: 5},
    nombre: { type: String, required: true, min: 5},
    telefono: { type: String, required: true, min: 5},
    email: { type: String, required: true},
    password: { type: String, required: true}
});

module.exports = mongoose.model('Users'. userSchema);