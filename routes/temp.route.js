const TempController = require('../controllers/temp.controller.js');
//const TempFilesController = require('../controllers/tempfiles.controller.js');

const express = require('express');
var router = express.Router();
//const auth = require('./auth');

router.post('/',  TempController.create);
router.get('/',  TempController.getAll);
router.get('/:id',  TempController.get);
router.put('/:id', TempController.update);
router.delete('/:id', TempController.delete);

// router.post('/:tempId/files',  TempFilesController.create);
// router.get('/:tempId/files',  TempFilesController.getAll);
// router.get('/:tempId/files/:fileId',  TempFilesController.get);
// router.put('/:tempId/files/:fileId', TempFilesController.update);
// router.delete('/:tempId/files/:fileId', TempFilesController.delete);

module.exports = router;    


