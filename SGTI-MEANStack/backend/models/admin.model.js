const mongoose = require('mongoose');
const { Schema } = mongoose;

const  adminSchema = new Schema({
    usuario: {
        type: String,
        required: true,
        min: 5,
        trim: true
    },
    email: {
        type: String,
        required: true,
        min: 5,
        trim: true
    },
    password: {
        type: String,
        required: true,
        min: 5,
        trim: true
    }
},
    {
        timestamps: true // Registra fecha de creacion y actualizacion de datos.
    }
);

module.exports = mongoose.model('Admin', adminSchema);