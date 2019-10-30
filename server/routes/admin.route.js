const express = require('express');
const router = express.Router();

router.get('/admin/:id', adminCtrl.getAdmin);
router.post('/admin/add', adminCtrl.createAdmin);
router.put('/admin/:id', adminCtrl.editAdmin);
router.delete('/admin/:id', adminCtrl.deleteAdmin);

module.exports = router;