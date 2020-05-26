const express = require('express');
const fileupload = require('express-fileupload');
const app = express();
const fs = require('fs');

const user = require('../models/user.model');

app.use(fileupload());

app.put('/usuario/img/:id', (req, res) => {

    const id = req.params.id;

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            message: 'No selecciono un archivo'
        });
    }

    //Obtengo nombre del archivo
    const archivo = req.files.img;
    const nombreCortado = archivo.name.split('.');
    const extencion = nombreCortado[nombreCortado.length - 1];

    //Parametrizo extenciones aceptadas
    const extencionValida = ['jpg', 'png', 'jpge', 'gif'];

    //Renombrar archivo - unico
    const nombArchivo = `${id} - ${new Date().getMilliseconds()}.${extencion}`;
    //Mover archivo temporal a un path especifico
    const path = `./uploads/usuarios/${nombArchivo}`;

    archivo.mv(path, err => {

        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error al mover archivo',
                errors: err
            });
        }

        subirImg(id, nombArchivo, res);

    });

    if (extencionValida.indexOf(extencion) < 0) {
        return res.status(400).json({
            ok: false,
            message: 'Extencion no valida',
            errors: { message: 'Las extenciones permitidas son: ' + extencionValida.join(', ') }
        });
    }

});

function subirImg(id, nombArchivo, res) {

        user.findById(id, (err, usuario) => {

            if(!usuario){
                return res.status(200).json({
                    ok: false,
                    message: 'No existe el usuario',
                    errors: err
                });
            }

            const pathAnterior = './uploads/usuarios/' + usuario.img;
            //Si existe, elimina imagen anterior
            if (fs.existsSync(pathAnterior)) {
                fs.unlink(pathAnterior, function(err){
                    if (err) throw err;
                });
            }

            usuario.img = nombArchivo;

            usuario.save((err, usuarioActualizado) => {
                return res.status(200).json({
                    ok: true,
                    message: 'Usuario Actualizado',
                    usuario: usuarioActualizado
                });
            })
        });
}

module.exports = app;
