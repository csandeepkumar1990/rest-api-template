const DealsController = require('../controllers/deals.controller.js');
const DealFilesController = require('../controllers/dealfiles.controller.js');


const express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');
const { check } = require('express-validator');

//deals


   //dealfiles
router.post('/:dealId/files',
    [check('dealId').not().isEmpty()], DealFilesController.create);
router.get('/:dealId/files', [check('dealId').not().isEmpty()], DealFilesController.getAll);
router.get('/:dealId/files/:dealFileId',
    [check('dealId').not().isEmpty(),
    check('dealFileId').not().isEmpty()], DealFilesController.get);
router.put('/:dealId/files/:dealFileId',
    [check('dealId').not().isEmpty(),
    check('dealFileId').not().isEmpty()], DealFilesController.update);
router.delete('/:dealId/files/:dealFileId',
    [check('dealId').not().isEmpty(),
    check('dealFileId').not().isEmpty()], DealFilesController.delete);

module.exports = router;


