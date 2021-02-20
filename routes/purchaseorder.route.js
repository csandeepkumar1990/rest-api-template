const express = require('express');
const router = express.Router();
//const auth = require('./auth');

const PurchaseorderController = require('../controllers/purchaseorder.controller.js');
//const PurchaseorderFilesController = require('../controllers/purchaseorderfiles.controller.js');

router.post('/',  PurchaseorderController.create);
router.get('/',  PurchaseorderController.getAll);
router.get('/:id',  PurchaseorderController.get);
router.put('/:id', PurchaseorderController.update);
router.delete('/:id', PurchaseorderController.delete);

// router.post('/:purchaseorderId/files',  PurchaseorderFilesController.create);
// router.get('/:purchaseorderId/files',  PurchaseorderFilesController.getAll);
// router.get('/:purchaseorderId/files/:fileId',  PurchaseorderFilesController.get);
// router.put('/:purchaseorderId/files/:fileId', PurchaseorderFilesController.update);
// router.delete('/:purchaseorderId/files/:fileId', PurchaseorderFilesController.delete);

module.exports = router;    


