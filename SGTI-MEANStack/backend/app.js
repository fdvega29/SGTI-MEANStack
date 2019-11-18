let express = require('express'),
path = require('path'),
mongoose = require('mongoose'),
cors = require('cors'),
bodyParser = require('body-parser'),
dataBaseConfig = require('./database/db');

//Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig, {
    useNewUrlParser: true
}).then(() => {
    console.log('Conexion a la BD exitosa!')
},
    error => {
        console.log('No se pudo conectar a la base, error: ' + error)
    }
)


//Set up express js port
const userRoute = require('../backend/routes/user.route')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/SGTI-MEANStack')));
app.use('/', express.static(path.join(__dirname, 'dist/SGTI-MEANStak')));
app.use('/api', userRoute)

//Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, ()=> {
    console.log('Conectado al puerto: '+ port)
})

//manejar un error 404
app.use((req, res, next) => {
    next(createError(404));
});

//manejando el error
app.use(function (err, req, res, next) {
    console.log(err.message);
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

