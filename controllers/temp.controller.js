var TempService = require('../services/temp.service');

const { validationResult } = require('express-validator');

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const temp = {
    aa: req.body.aa,







    createdBy: req.body.createdBy
  };

  try {
    const query = {
      where: {
        aa: req.body.aa
      }
    }
    const foundTemp = await TempService.get(query);
    if (foundTemp)
      throw ({ message: "Temp found for the given temp aa: " + query.where.aa, code: 500 });
    var newTemp = await TempService.create(temp);
    res.send(newTemp);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the Temp.",
      code: err.code || 500
    });
  }
};


exports.getAll = async (req, res) => {
  try {
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;

    var temp = await TempService.getAll(page, limit);
    res.send(temp);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while retrieving the temp", code: err.code || 500
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
    var temp = await TempService.get(query);
    if (!temp)
      throw ({ message: "Temp not found for the given temp id: " + query.where.id, code: 404 });
    res.send(temp);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while finding the temp", code: err.code || 500
    });
  }
};

exports.update = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const temp = {
      aa: req.body.aa,







      updatedBy: req.body.updatedBy
    }

    const query = {
      where: {
        id: req.params.id
      }

    }
    let foundTemp = await TempService.get(query);
    if (!foundTemp)
      throw ({ message: "Temp not found for the given temp id: " + query.where.id, code: 500 });
    var updatedTemp = await TempService.update(temp, query);
    res.send(updatedTemp);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while updating the Temp.", code: err.code || 500
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
    const updatedTemp = await TempService.delete(query);
    if (updatedTemp === 1) {
      res.status(200).send({ message: "delete success for temp id: " + query.where.id, code: 200 });
    } else {
      res.status(200).send({ message: "temp not found for id: " + query.where.id, code: 200 });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while deleting the Temp.", code: err.code || 500
    });
  }
};

