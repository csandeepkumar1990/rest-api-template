const express = require('express');
const router = express.Router();
//const auth = require('./auth');

const AbcController = require('../controllers/abc.controller.js');
//const AbcFilesController = require('../controllers/abcfiles.controller.js');

router.post('/',  AbcController.create);
router.get('/',  AbcController.getAll);
router.get('/:id',  AbcController.get);
router.put('/:id', AbcController.update);
router.delete('/:id', AbcController.delete);

// router.post('/:abcId/files',  AbcFilesController.create);
// router.get('/:abcId/files',  AbcFilesController.getAll);
// router.get('/:abcId/files/:fileId',  AbcFilesController.get);
// router.put('/:abcId/files/:fileId', AbcFilesController.update);
// router.delete('/:abcId/files/:fileId', AbcFilesController.delete);

module.exports = router;    


