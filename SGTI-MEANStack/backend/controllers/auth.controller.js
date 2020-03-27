const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

//Google
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '521536697432-9q3arjpcgm0fucbd5m6vtcsl6el34r45.apps.googleusercontent.com';


const usersCtrl = {}
//Register
usersCtrl.createUser = async (req, res, next) => {
    const user = new User(req.body);
    user.password = await user.encryptPassword(user.password); 
    await user.save();
    const expiresIn = 14400 /*Token expira en 4hs*/
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

//=================================================================
// LOGIN MEDIANTE GOOGLE
//=================================================================
const client = new OAuth2Client(CLIENT_ID);
async function verify() {
  const ticket = await client.verifyIdToken({ 
      idToken: token,
      audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  //const userid = payload['sub'];
  // If request specified a G Suite domain:
  //const domain = payload['hd'];

  /*return{
      nombre: payload.name,
      email: payload.email,
      img: payload.picture,
      google: true
  };*/

  await User.findOne({ email: payload.email}, (err, usuario) => {
    if(err){
        return res.status(500).json({
            ok: true,
            mensaje: 'Error al intentar ingresar con este correo' || email,
            errors: err
        });
    }
    if (usuario.google === false){
        return res.status(400).json({
            ok: true,
            mensaje: 'Ingrese con la autenticacion propia del sistema'
        });
    }else {
        usuario.password
    }
  });
}
verify().catch(console.error);

usersCtrl.loginUserGoogle = async (req, res) => {

    const token = req.body.token;
    
    const googleUser = await verify(token)
                        .catch(error => {
                            return res.status(403).json({
                                ok: false,
                                mensaje: 'Token no valido'
                            })
                        });
    return res.status(200).json({
        ok: true,
        mensaje: 'Token valido',
        googleUser: googleUser
    });
};

//=================================================================
// LOGIN NORMAL
//=================================================================
usersCtrl.loginUser = async (req, res, next) => {
   const user = await User.findOne({email: req.body.email})
    if(!user){
        return res.status(409).send({message: 'Email incorrecto'})
    };
   const validPassword = user.comparePassword(req.body.password, user.password)
    if(validPassword){
        const expiresIn = 14400 /*Token expira en 4hs*/
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

