const express = require('express');
const router = express.Router();

const adminCtrl = require('../controllers/admin.controller');

router.get('/', adminCtrl.getAllAdmin);
router.post('/', adminCtrl.createAdmin);
router.get('/:id', adminCtrl.getAdmin);
router.put('/:id', adminCtrl.editAdmin);
router.delete('/:id', adminCtrl.deleteAdmin);

module.exports = router;