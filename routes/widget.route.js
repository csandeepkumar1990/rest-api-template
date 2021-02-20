const express = require('express');
const router = express.Router();
//const auth = require('./auth');

const WidgetController = require('../controllers/widget.controller.js');
//const WidgetFilesController = require('../controllers/widgetfiles.controller.js');

router.post('/',  WidgetController.create);
router.get('/',  WidgetController.getAll);
router.get('/:id',  WidgetController.get);
router.put('/:id', WidgetController.update);
router.delete('/:id', WidgetController.delete);

// router.post('/:widgetId/files',  WidgetFilesController.create);
// router.get('/:widgetId/files',  WidgetFilesController.getAll);
// router.get('/:widgetId/files/:fileId',  WidgetFilesController.get);
// router.put('/:widgetId/files/:fileId', WidgetFilesController.update);
// router.delete('/:widgetId/files/:fileId', WidgetFilesController.delete);

module.exports = router;    


