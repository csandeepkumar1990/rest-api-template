const express = require('express');
const router = express.Router();
//const auth = require('./auth');

const AaasController = require('../controllers/aaas.controller.js');
//const AaasFilesController = require('../controllers/aaasfiles.controller.js');

router.post('/',  AaasController.create);
router.get('/',  AaasController.getAll);
router.get('/:id',  AaasController.get);
router.put('/:id', AaasController.update);
router.delete('/:id', AaasController.delete);

// router.post('/:aaasId/files',  AaasFilesController.create);
// router.get('/:aaasId/files',  AaasFilesController.getAll);
// router.get('/:aaasId/files/:fileId',  AaasFilesController.get);
// router.put('/:aaasId/files/:fileId', AaasFilesController.update);
// router.delete('/:aaasId/files/:fileId', AaasFilesController.delete);

module.exports = router;    


