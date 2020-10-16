var ContactActivityService = require('../services/contactactivity.service');

const { validationResult } = require('express-validator');

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const contactActivity = {
    contactId: req.params.contactId,
    activityId: req.params.activityId,
    field1: req.body.field1,
    field2: req.body.field2,
    field3: req.body.field3,
    field4: req.body.field4,
    field5: req.body.field5,
    field: req.body.field6,
    insertedBy: req.body.insertedBy
    
  };

  try {
    var newContactActivity = await ContactActivityService.create(contactActivity);
    res.send(newContactActivity);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the Contact Activity.",
      code: err.code || 500
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;
    const contactId = req.params.contactId;

    var contactActivity = await ContactActivityService.getAll(page, limit, contactId);
    res.send(contactActivity);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while retrieving the Contact Activity", code: err.code || 500
    });
  }
};

exports.get = async (req, res) => {
  try {
    const query = {
      where: {
        contactId: req.params.contactId,
        activityId: req.params.activityId
      }
    }
    var contact = await ContactActivityService.get(query);
    if (!contact)
      throw ({ message: "Contact found for the given contact id: " + query.where.id, code: 500 });
    var contactActivity = await ContactActivityService.get(query);
    res.send(contactActivity);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while finding the Contact Activity", code: err.code || 500
    });
  }
};

exports.update = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let contactActivity = {
    field1: req.body.field1,
    field2: req.body.field2,
    field3: req.body.field3,
    field4: req.body.field4,
    field5: req.body.field5,
    field6: req.body.field6,
    updatedBy: req.body.updatedBy
  };


  const query = {
    where: {
      contactId: req.params.contactId,
      activityId: req.params.activityId
    }
  }

  try {
    var updateContactActivity = await ContactActivityService.update(contactActivity, query);
    res.send(updateContactActivity);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while updating the Contact Activity.", code: err.code || 500
    });
  }
};

exports.delete = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    var updatedContactActivity = await ContactActivityService.delete(req.params.contactId, req.params.activityId);
    if (updatedContactActivity === 1) {
      res.status(200).send({ message: "delete success for Contact Activityid: " + req.params.activityId, code: 200 });
    } else {
      throw ({ message: "Unable to delete ContactActivity for Contact Activityid : " + req.params.activityId, code: 500 });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while deleting the Contact Activity.", code: err.code || 500
    });
  }
};

