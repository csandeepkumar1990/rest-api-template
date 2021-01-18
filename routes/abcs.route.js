const express = require('express');
const router = express.Router();
//const auth = require('./auth');

const AbcsController = require('../controllers/abcs.controller.js');
//const AbcsFilesController = require('../controllers/abcsfiles.controller.js');

router.post('/',  AbcsController.create);
router.get('/',  AbcsController.getAll);
router.get('/:id',  AbcsController.get);
router.put('/:id', AbcsController.update);
router.delete('/:id', AbcsController.delete);

// router.post('/:abcsId/files',  AbcsFilesController.create);
// router.get('/:abcsId/files',  AbcsFilesController.getAll);
// router.get('/:abcsId/files/:fileId',  AbcsFilesController.get);
// router.put('/:abcsId/files/:fileId', AbcsFilesController.update);
// router.delete('/:abcsId/files/:fileId', AbcsFilesController.delete);

module.exports = router;    


