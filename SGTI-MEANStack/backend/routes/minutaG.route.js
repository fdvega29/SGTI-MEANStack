const { Router } = require('express');
const router = Router();

const dataMinG = require('../controllers/minutaG.controller');

router.post('/add', dataMinG.createTramG);
router.get('/all', dataMinG.getAllDataG);
router.get('/:id', dataMinG.getDataG);
router.put('/edit/:id', dataMinG.editDataG);
router.delete('/delete/:id', dataMinG.deleteDataG);

module.exports = router;
