const { Router } = require('express'); 
const router = Router();

const historial = require('../controllers/historialTram.controller');

router.post('/add', historial.createHistorial);
router.get('/all', historial.getAllHistorial);
router.get('/:id', historial.getHistorialById);
router.get('/all/:id', historial.getAllDataById);
router.put('/edit/:id', historial.editHistorial);
router.delete('/delete/:id', historial.deleteHistorial);

module.exports = router;