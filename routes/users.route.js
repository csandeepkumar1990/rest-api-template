const UsersController = require('../controllers/users.controller.js');
//const UsersFilesController = require('../controllers/usersfiles.controller.js');

const express = require('express');
var router = express.Router();
//const auth = require('./auth');

router.post('/',  UsersController.create);
router.get('/',  UsersController.getAll);
router.get('/:id',  UsersController.get);
router.put('/:id', UsersController.update);
router.delete('/:id', UsersController.delete);

// router.post('/:usersId/files',  UsersFilesController.create);
// router.get('/:usersId/files',  UsersFilesController.getAll);
// router.get('/:usersId/files/:fileId',  UsersFilesController.get);
// router.put('/:usersId/files/:fileId', UsersFilesController.update);
// router.delete('/:usersId/files/:fileId', UsersFilesController.delete);

module.exports = router;    


