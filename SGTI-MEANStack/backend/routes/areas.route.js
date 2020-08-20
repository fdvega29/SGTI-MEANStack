const { Router } = require('express'); 
const router = Router();

const areas = require('../controllers/area.controller');

router.post('/add', areas.createArea);
router.get('/all', areas.getAllArea);
router.get('/area/:id', areas.getAreaById);
router.put('/edit/:id', areas.editArea);
router.delete('/delete/:id', areas.deleteArea);

module.exports = router;