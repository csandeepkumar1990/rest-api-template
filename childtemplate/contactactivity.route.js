const ContactactivityController = require('../controllers/contactactivitys.controller.js');
const express = require('express');
var router = express.Router();


router.post('/:contactId/activitys/',  ContactactivityController.create);
router.get('/:contactId/activitys/',  ContactactivityController.getAll);
router.get('/:contactId/activitys/:activityId',  ContactactivityController.get);
router.put('/:contactId/activitys/:activityId', ContactactivityController.update);
router.delete('/:contactId/activitys/:activityId', ContactactivityController.delete);

module.exports = router;
