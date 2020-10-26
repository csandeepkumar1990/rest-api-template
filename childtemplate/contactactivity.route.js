const ContactactivityController = require('../controllers/contactactivity.controller.js');
const express = require('express');
var router = express.Router();


router.post('/:contactId/activity/',  ContactactivityController.create);
router.get('/:contactId/activity/',  ContactactivityController.getAll);
router.get('/:contactId/activity/:activityId',  ContactactivityController.get);
router.put('/:contactId/activity/:activityId', ContactactivityController.update);
router.delete('/:contactId/activity/:activityId', ContactactivityController.delete);

module.exports = router;
