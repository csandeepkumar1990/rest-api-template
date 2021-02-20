const express = require('express');
const router = express.Router();
//const auth = require('./auth');

const PurchaseordermasterController = require('../controllers/purchaseordermaster.controller.js');
//const PurchaseordermasterFilesController = require('../controllers/purchaseordermasterfiles.controller.js');

router.post('/',  PurchaseordermasterController.create);
router.get('/',  PurchaseordermasterController.getAll);
router.get('/:id',  PurchaseordermasterController.get);
router.put('/:id', PurchaseordermasterController.update);
router.delete('/:id', PurchaseordermasterController.delete);

// router.post('/:purchaseordermasterId/files',  PurchaseordermasterFilesController.create);
// router.get('/:purchaseordermasterId/files',  PurchaseordermasterFilesController.getAll);
// router.get('/:purchaseordermasterId/files/:fileId',  PurchaseordermasterFilesController.get);
// router.put('/:purchaseordermasterId/files/:fileId', PurchaseordermasterFilesController.update);
// router.delete('/:purchaseordermasterId/files/:fileId', PurchaseordermasterFilesController.delete);

module.exports = router;    


