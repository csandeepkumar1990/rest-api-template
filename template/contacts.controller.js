var ContactService = require('../services/contacts.service');

const { validationResult } = require('express-validator');

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const contact = {
    name: req.body.name,
    type: req.body.type,
    description: req.body.description
  };

  try {
    const query = {
      where: {
        name: req.body.name
      }
    }
    const foundContact = await ContactService.get(query);
    if (foundContact)
      throw ({ message: "Contact found for the given contact name: " + query.where.name, code: 500 });
    var newContact = await ContactService.create(contact);
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

    var contact = await ContactService.getAll(page, limit);
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
    var contact = await ContactService.get(query);
    if (!contact)
      throw ({ message: "Contact found for the given contact id: " + query.where.id, code: 404 });
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
      name: req.body.name,
      type: req.body.type,
      description: req.body.description
    }
    
    const query = {
      where: {
        id: req.params.id
      }

    }
    let foundContact = await ContactService.get(query);
    if (!foundContact)
      throw ({ message: "Contact not found for the given contact id: " + query.where.id, code: 500 });
    var updatedContact = await ContactService.update(contact, query);
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
    let foundContact = await ContactService.get(query);
    if (!foundContact)
      return ({ message: "Contact not found for the given contact id: " + query.where.id, code: 500 });
    var updatedContact = await ContactService.delete(query);
    res.send(updatedContact);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while deleting the Contact.", code: err.code || 500
    });
  }
};
