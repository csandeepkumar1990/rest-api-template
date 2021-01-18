const { validationResult } = require('express-validator');

const AbcsService = require('../services/abcs.service');

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const abcs = {
    a: req.body.a,
    b: req.body.b,
    c: req.body.c,
    ccc: req.body.ccc,
    cccc: req.body.cccc,
    d: req.body.d,
    ddd: req.body.ddd,
    ee: req.body.ee,
    eeee: req.body.eeee,
    ef: req.body.ef,
    er: req.body.er,
    et: req.body.et,
    ey: req.body.ey,
    eu: req.body.eu,
    aaaaa: req.body.aaaaa,
    d: req.body.d,
    eee: req.body.eee,

    createdBy: req.body.createdBy
  };

  try {
    const query = {
      where: {
        a: req.body.a
      }
    }
    const foundAbcs = await AbcsService.get(query);
    if (foundAbcs)
      throw ({ message: "Abcs found for the given abcs a: " + query.where.a, code: 500 });
    const newAbcs = await AbcsService.create(abcs);
    res.send(newAbcs);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the Abcs.",
      code: err.code || 500
    });
  }
};


exports.getAll = async (req, res) => {
  try {
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;

    const abcs = await AbcsService.getAll(page, limit);
    res.send(abcs);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while retrieving the abcs", code: err.code || 500
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
    const abcs = await AbcsService.get(query);
    if (!abcs)
      throw ({ message: "Abcs not found for the given abcs id: " + query.where.id, code: 404 });
    res.send(abcs);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while finding the abcs", code: err.code || 500
    });
  }
};

exports.update = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const abcs = {
      a: req.body.a,
      b: req.body.b,
      c: req.body.c,
      ccc: req.body.ccc,
      cccc: req.body.cccc,
      d: req.body.d,
      ddd: req.body.ddd,
      ee: req.body.ee,
      eeee: req.body.eeee,
      ef: req.body.ef,
      er: req.body.er,
      et: req.body.et,
      ey: req.body.ey,
      eu: req.body.eu,
      aaaaa: req.body.aaaaa,
      d: req.body.d,
      eee: req.body.eee,

      updatedBy: req.body.updatedBy
    }

    const query = {
      where: {
        id: req.params.id
      }

    }
    const foundAbcs = await AbcsService.get(query);
    if (!foundAbcs)
      throw ({ message: "Abcs not found for the given abcs id: " + query.where.id, code: 500 });
    const updatedAbcs = await AbcsService.update(abcs, query);
    res.send(updatedAbcs);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while updating the Abcs.", code: err.code || 500
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
    const updatedAbcs = await AbcsService.delete(query);
    if (updatedAbcs === 1) {
      res.status(200).send({ message: "delete success for abcs id: " + query.where.id, code: 200 });
    } else {
      res.status(200).send({ message: "abcs not found for id: " + query.where.id, code: 200 });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while deleting the Abcs.", code: err.code || 500
    });
  }
};

