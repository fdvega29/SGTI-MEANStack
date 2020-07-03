const express = require('express');
const app = express();

const path = require('path');
const fs = require('fs');


app.get('/usuarios/:img', (req, res, next) => {

    const img = req.params.img;

    const pathImg = path.resolve(__dirname, `./uploads/usuarios/${ img }`);

    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg)
    } else {
        const pathNoImg = path.resolve(__dirname, '..assets/dist/img/usuario.png')
        res.sendFile(pathNoImg);
    }

});

module.exports = app;