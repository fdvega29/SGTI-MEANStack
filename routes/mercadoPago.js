const express = require('express');
const app = express(); 
const mercadopago = require('mercadopago');

// Credenciales
mercadopago.configure({
    access_token: 'TEST-1433329887629306-090100-528a994a37cc4810be8fc2a1a88fdd95-290597670'
});

app.post('/checkout', async (req, res) =>{
    const data = req.body;
    await mercadopago.preferences.create(data)
    .then(function(response){
        // Este valor reemplazará el string "<%= global.id %>" en tu HTML
        //global.id = res.body.id;
        console.log(global.id);
        return res.status(200).json({
            data: response
        })
    }).catch(function(error){
        console.log(error);
    });
});

module.exports = app;