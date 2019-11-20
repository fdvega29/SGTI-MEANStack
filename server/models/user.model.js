const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

mongoose.set('useCreateIndex', true);

const usersSchema = new Schema({

    apellido: { type: String, 
                required: true,
                trim: true, 
                min: 5},
    nombre: { type: String, 
              required: true,
              trim: true,
              min: 5},
    telefono: { type: String, 
                required: true,
                trim: true,
                min: 5},
    email: { type: String, 
             required: true,
             trim: true,
             unique: true},
    password: { type: String, 
                required: true,
                trim: true},       
}, {
    timestamps: true // Registra fecha de creacion y actualizacion de datos.
});

/*
//Funcion que encripta la contraseña, gracias al metodo getSalt y hash.
usersSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

//Funcion que compara contraseñas ingresadas desde Regist a Login, gracias al metedo compare.
usersSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

*/

module.exports = mongoose.model('Users', usersSchema);