const { Router }  = require('express');
const router = Router();
 
const users = require('../controllers/user.controller');

router.get('/users', users.getAllUser);
router.get('/:id', users.getUser);
router.put('/users/:id', users.editUser);
router.delete('/users/:id', users.deleteUser);

module.exports = router;