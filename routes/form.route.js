const express = require('express');
const router = express.Router();

const formCtrl = require('../controllers/form.controller');

router.get('/', formCtrl.getAllForm);
router.post('/', formCtrl.createForm);
router.get('/:id', formCtrl.getForm);
router.put('/:id', formCtrl.editForm);
router.delete('/:id', formCtrl.deleteForm);

module.exports = router;