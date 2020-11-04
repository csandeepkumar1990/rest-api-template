var UserService = require('../services/users.service');

const { validationResult } = require('express-validator');

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  const user = {
    field1: req.body.field1,
    field2: req.body.field2,
    field3: req.body.field3,
    insertedBy: req.body.insertedBy,
    updatedBy: req.body.updatedBy
  };

  try {
    var newUser = await UserService.create(user);
    res.send(newUser);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the User.",
      code: err.code || 500
    });
  }
};


exports.getAll = async (req, res) => {
  try {
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;

    var user = await UserService.getAll(page, limit);
    res.send(user);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while retrieving the user", code: err.code || 500
    });
  }
};

exports.get = async (req, res) => {
  try {
    const query = {
      _id: req.params.userId
    }
    var user = await UserService.findOne(query);
    res.send(user);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while finding the user", code: err.code || 500
    });
  }
};

exports.update = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  let user = {
    field1: req.body.field1,
    field2: req.body.field2,
    field3: req.body.field3,
    userName: req.body.userName,
    insertedBy: req.body.insertedBy,
    updatedBy: req.body.updatedBy
  };

  var keys = Object.keys(user);
  for (var i = 0; i < keys.length; i++) {
    if (!user[keys[i]]) {
      delete user[keys[i]];
    }
  }

  const userQuery = {
    _id: req.params.userId
  }

  try {
    var updatedUser = await UserService.update(user, userQuery);
    res.send(updatedUser);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while updating the user.", code: err.code || 500
    });
  }
};

exports.delete = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    var updatedUser = await UserService.delete(req.params.userId);
    res.send(updatedUser);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while deleting the user.", code: err.code || 500
    });
  }
};

