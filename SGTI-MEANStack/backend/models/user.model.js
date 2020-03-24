const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

mongoose.set('useCreateIndex', true);

const usersSchema = new Schema({

    apellido: { 
                type: String,
                required: [true, 'El apellido es requerido'],
                min: 5,
                trim: true
            },
    nombre: {   
                type: String,
                required: [true, 'El nombre es requerido'],
                min: 5,
                trim: true
            },
    telefono: { 
                type: String,
                required: [true, 'El telefono es requerido'],
                trim: true,
                unique: true
            },
    email: {    
                type: String,
                required: [true, 'El correo es requerido'],
                trim: true,
                unique: true
            },
    password: { 
                type: String,
                required: [true, 'La contraseña es requerida'],
                trim: true
            },
    /*roles: {
        type: String,
        required: true,
        default: "USER_ROLE"
    }*/

    google: {
            type: Boolean,
            required: true,
            default: false
    }
},
    {
        timestamps: true // Registra fecha de creacion y actualizacion de datos.
    }
);


//Funcion que encripta la contraseña, gracias al metodo getSalt y hash.
usersSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};
//Funcion que compara contraseñas ingresadas desde Regist a Login, gracias al metedo compare.
usersSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('Users', usersSchema);