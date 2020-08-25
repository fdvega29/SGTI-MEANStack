const { Router } = require('express'); 
const router = Router();

const authUser = require('../controllers/auth.controller')

router.post('/signup', authUser.createUser);
router.post('/signin', authUser.loginUser);
router.post('/signin/google', authUser.loginUserGoogle);
router.get('/logout', authUser.logoutUser);

module.exports = router;




