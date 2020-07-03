const { Router } = require('express'); 
const router = Router();

const dataMinH = require('../controllers/minutaH.controller');

router.post('/add', dataMinH.createTram);
router.get('/all', dataMinH.getAllData);
router.get('/all/:id', dataMinH.getAllDataById);
router.get('/:id', dataMinH.getData);
router.put('/edit/:id', dataMinH.editData);
router.delete('/delete/:id', dataMinH.deleteData);

module.exports = router;
