const { Router } = require('express'); 
const router = Router();

const tipo = require('../controllers/tipoTramite.controller');

router.post('/add', tipo.createTipoTram);
router.get('/all', tipo.getAllTipoTram);
router.get('/:id', tipo.getTipoTramById);
router.put('/edit/:id', tipo.editTipoTram);
router.delete('/delete/:id', tipo.deleteTipoTram);

module.exports = router;