const { validationResult } = require('express-validator');

const ContactService = require('../services/contact.service');

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const contact = {
    field3: req.body.field3,
    field4: req.body.field4,
    field5: req.body.field5,
    field6: req.body.field6,
    field7: req.body.field7,
    field8: req.body.field8,
    field9: req.body.field9,
    field10: req.body.field10,
    field11: req.body.field11,
    field12: req.body.field12,
    field13: req.body.field13,
    field14: req.body.field14,
    field15: req.body.field15,
    field16: req.body.field16,
    field17: req.body.field17,
    field18: req.body.field18,
    field19: req.body.field19,
    field20: req.body.field20,
    createdBy: req.body.createdBy
  };

  try {
    const query = {
      where: {
        whereFieldParam: req.body.whereFieldParam
      }
    }
    const foundContact = await ContactService.get(query);
    if (foundContact)
      throw ({ message: "Contact found for the given contact whereFieldParam: " + query.where.whereFieldParam, code: 500 });
    const newContact = await ContactService.create(contact);
    res.send(newContact);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the Contact.",
      code: err.code || 500
    });
  }
};


exports.getAll = async (req, res) => {
  try {
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;

    const contact = await ContactService.getAll(page, limit);
    res.send(contact);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while retrieving the contact", code: err.code || 500
    });
  }
};

exports.get = async (req, res) => {
  try {
    const query = {
      where: {
        id: req.params.id
      }
    }
    const contact = await ContactService.get(query);
    if (!contact)
      throw ({ message: "Contact not found for the given contact id: " + query.where.id, code: 404 });
    res.send(contact);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while finding the contact", code: err.code || 500
    });
  }
};

exports.update = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const contact = {
      field3: req.body.field3,
      field4: req.body.field4,
      field5: req.body.field5,
      field6: req.body.field6,
      field7: req.body.field7,
      field8: req.body.field8,
      field9: req.body.field9,
      field10: req.body.field10,
      field11: req.body.field11,
      field12: req.body.field12,
      field13: req.body.field13,
      field14: req.body.field14,
      field15: req.body.field15,
      field16: req.body.field16,
      field17: req.body.field17,
      field18: req.body.field18,
      field19: req.body.field19,
      field20: req.body.field20,
      updatedBy: req.body.updatedBy
    }

    const query = {
      where: {
        id: req.params.id
      }

    }
    const foundContact = await ContactService.get(query);
    if (!foundContact)
      throw ({ message: "Contact not found for the given contact id: " + query.where.id, code: 500 });
    const updatedContact = await ContactService.update(contact, query);
    res.send(updatedContact);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while updating the Contact.", code: err.code || 500
    });
  }
};



exports.delete = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const query = {
      where: {
        id: req.params.id
      }
    }
    const updatedContact = await ContactService.delete(query);
    if (updatedContact === 1) {
      res.status(200).send({ message: "delete success for contact id: " + query.where.id, code: 200 });
    } else {
      res.status(200).send({ message: "contact not found for id: " + query.where.id, code: 200 });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while deleting the Contact.", code: err.code || 500
    });
  }
};

