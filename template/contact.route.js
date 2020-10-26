const ContactController = require('../controllers/contact.controller.js');
const ContactFilesController = require('../controllers/contactfiles.controller.js');

const express = require('express');
var router = express.Router();
const auth = require('./auth');

router.post('/',  ContactController.create);
router.get('/',  ContactController.getAll);
router.get('/:id',  ContactController.get);
router.put('/:id', ContactController.update);
router.delete('/:id', ContactController.delete);

router.post('/:contactId/files',  ContactFilesController.create);
router.get('/:contactId/files',  ContactFilesController.getAll);
router.get('/:contactId/files/:fileId',  ContactFilesController.get);
router.put('/:contactId/files/:fileId', ContactFilesController.update);
router.delete('/:contactId/files/:fileId', ContactFilesController.delete);

module.exports = router;    


