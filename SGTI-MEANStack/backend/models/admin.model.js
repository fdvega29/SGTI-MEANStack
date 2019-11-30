const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

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


//Funcion que encripta la contraseña, gracias al metodo getSalt y hash.
adminSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};
//Funcion que compara contraseñas ingresadas desde Regist a Login, gracias al metedo compare.
adminSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);