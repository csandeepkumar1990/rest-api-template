const ReportsController = require('../controllers/reports.controller.js');
const express = require('express');
var router = express.Router();


router.post('/',  ReportsController.create);
router.get('/',  ReportsController.getAll);
router.get('/:reportId',  ReportsController.get);
router.put('/:reportId', ReportsController.update);
router.delete('/:reportId', ReportsController.delete);

module.exports = router;


