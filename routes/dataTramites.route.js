const { Router } = require('express'); 
const router = Router();

const dataTramite = require('../controllers/dataTramites.controller');

router.post('/add', dataTramite.createTram);
router.get('/all', dataTramite.getAllData);
router.get('/all/maxcodi', dataTramite.getAllMaxCodi);
router.get('/all/:id', dataTramite.getAllDataById);
router.get('/:id', dataTramite.getData);
router.put('/edit/:id', dataTramite.editData);
router.delete('/delete/:id', dataTramite.deleteData);

module.exports = router;
