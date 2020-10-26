const ContactsController = require('../controllers/contacts.controller.js');
const ContactFilesController = require('../controllers/contactfiles.controller.js');

const express = require('express');
var router = express.Router();
const auth = require('./auth');

router.post('/',  ContactsController.create);
router.get('/',  ContactsController.getAll);
router.get('/:id',  ContactsController.get);
router.put('/:id', ContactsController.update);
router.delete('/:id', ContactsController.delete);

router.post('/:contactId/files',  ContactFilesController.create);
router.get('/:contactId/files',  ContactFilesController.getAll);
router.get('/:contactId/files/:fileId',  ContactFilesController.get);
router.put('/:contactId/files/:fileId', ContactFilesController.update);
router.delete('/:contactId/files/:fileId', ContactFilesController.delete);

module.exports = router;    


