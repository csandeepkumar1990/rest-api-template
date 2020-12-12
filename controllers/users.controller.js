var UsersService = require('../services/users.service');

const { validationResult } = require('express-validator');

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const users = {
    aa: req.body.aa,







    createdBy: req.body.createdBy
  };

  try {
    const query = {
      where: {
        aa: req.body.aa
      }
    }
    const foundUsers = await UsersService.get(query);
    if (foundUsers)
      throw ({ message: "Users found for the given users aa: " + query.where.aa, code: 500 });
    var newUsers = await UsersService.create(users);
    res.send(newUsers);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the Users.",
      code: err.code || 500
    });
  }
};


exports.getAll = async (req, res) => {
  try {
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;

    var users = await UsersService.getAll(page, limit);
    res.send(users);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while retrieving the users", code: err.code || 500
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
    var users = await UsersService.get(query);
    if (!users)
      throw ({ message: "Users not found for the given users id: " + query.where.id, code: 404 });
    res.send(users);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while finding the users", code: err.code || 500
    });
  }
};

exports.update = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const users = {
      aa: req.body.aa,







      updatedBy: req.body.updatedBy
    }

    const query = {
      where: {
        id: req.params.id
      }

    }
    let foundUsers = await UsersService.get(query);
    if (!foundUsers)
      throw ({ message: "Users not found for the given users id: " + query.where.id, code: 500 });
    var updatedUsers = await UsersService.update(users, query);
    res.send(updatedUsers);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while updating the Users.", code: err.code || 500
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
    const updatedUsers = await UsersService.delete(query);
    if (updatedUsers === 1) {
      res.status(200).send({ message: "delete success for users id: " + query.where.id, code: 200 });
    } else {
      res.status(200).send({ message: "users not found for id: " + query.where.id, code: 200 });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while deleting the Users.", code: err.code || 500
    });
  }
};

