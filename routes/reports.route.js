const express = require('express');
const router = express.Router();
//const auth = require('./auth');

const ReportsController = require('../controllers/reports.controller.js');
//const ReportsFilesController = require('../controllers/reportsfiles.controller.js');

router.post('/',  ReportsController.create);
router.get('/',  ReportsController.getAll);
router.get('/:id',  ReportsController.get);
router.put('/:id', ReportsController.update);
router.delete('/:id', ReportsController.delete);

// router.post('/:reportsId/files',  ReportsFilesController.create);
// router.get('/:reportsId/files',  ReportsFilesController.getAll);
// router.get('/:reportsId/files/:fileId',  ReportsFilesController.get);
// router.put('/:reportsId/files/:fileId', ReportsFilesController.update);
// router.delete('/:reportsId/files/:fileId', ReportsFilesController.delete);

module.exports = router;    


