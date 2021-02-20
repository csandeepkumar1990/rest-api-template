const express = require('express');
const router = express.Router();
//const auth = require('./auth');

const TenantwidgetController = require('../controllers/tenantwidget.controller.js');
//const TenantwidgetFilesController = require('../controllers/tenantwidgetfiles.controller.js');

router.post('/',  TenantwidgetController.create);
router.get('/',  TenantwidgetController.getAll);
router.get('/:id',  TenantwidgetController.get);
router.put('/:id', TenantwidgetController.update);
router.delete('/:id', TenantwidgetController.delete);

// router.post('/:tenantwidgetId/files',  TenantwidgetFilesController.create);
// router.get('/:tenantwidgetId/files',  TenantwidgetFilesController.getAll);
// router.get('/:tenantwidgetId/files/:fileId',  TenantwidgetFilesController.get);
// router.put('/:tenantwidgetId/files/:fileId', TenantwidgetFilesController.update);
// router.delete('/:tenantwidgetId/files/:fileId', TenantwidgetFilesController.delete);

module.exports = router;    


