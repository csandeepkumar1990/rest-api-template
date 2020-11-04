const UsersController = require('../controllers/users.controller.js');
const express = require('express');
var router = express.Router();


router.post('/',  UsersController.create);
router.get('/',  UsersController.getAll);
router.get('/:userId',  UsersController.get);
router.put('/:userId', UsersController.update);
router.delete('/:userId', UsersController.delete);

module.exports = router;


