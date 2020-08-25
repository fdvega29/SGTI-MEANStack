const mongoose = require('mongoose');
const { Schema } = mongoose;

const area = new Schema({
    nombre: {type: String},
    encargado: {type: String}
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Area', area);