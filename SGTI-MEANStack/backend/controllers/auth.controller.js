const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const usersCtrl = {}
//Register
usersCtrl.createUser = async (req, res, next) => {
    const user = new User(req.body);
    user.password = await user.encryptPassword(user.password); 
    await user.save();
    const expiresIn = 60 * 60 * 24 /*token expira en 24hs*/ 
    const token = await jwt.sign({ id: user._id }, 'mySecretToken', {  /*metodo sign: crea un token*/
        expiresIn: expiresIn
    });
    const dataUser = {
        apellido: user.apellido,
        nombre: user.nombre,
        email: user.email,
        token: token,
        expiresIn: expiresIn
    }
    res.json({ auth: true, dataUser ,token });
};
//Login
usersCtrl.loginUser = async (req, res, next) => {
   const user = await User.findOne({email: req.body.email})
    if(!user){
        return res.status(409).send({message: 'Email incorrecto'})
    };
   const validPassword = user.comparePassword(req.body.password, user.password)
    if(validPassword){
        const expiresIn = 60 * 60 * 24
        const token = await jwt.sign({id: user._id}, 'mySecretToken',{
            expiresIn: expiresIn
        });
        const dataUser = {
            email: user.email,
            token: token,
            expiresIn: expiresIn 
        }
            res.status(200).json({ auth: true, dataUser ,token });
    }else{
        return res.status(401).send({auth: false, token: null});
    };       
}
//Logout
usersCtrl.logoutUser = (req, res) =>{
    res.status(200).send({
        auth: false,
        token: null
    });
}

module.exports = usersCtrl;

