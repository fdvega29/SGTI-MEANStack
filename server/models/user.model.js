const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const usersSchema = new Schema({

    apellido: { type: String, required: true, min: 5},
    nombre: { type: String, required: true, min: 5},
    telefono: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true}
    //date: { type: Date, default: Date.now}
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