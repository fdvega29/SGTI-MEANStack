const { Router }  = require('express');
const router = Router();
 
const users = require('../controllers/user.controller');

router.get('/all', users.getAllUser);
router.get('/:id', users.getUser);
router.put('/update/:id', users.editUser);
router.put('/updateEstado/:id', users.editEstadoUser);
router.delete('/delete/:id', users.deleteUser);

module.exports = router;