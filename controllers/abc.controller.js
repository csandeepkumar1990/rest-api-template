const { validationResult } = require('express-validator');

const AbcService = require('../services/abc.service');

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const abc = {
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
    const foundAbc = await AbcService.get(query);
    if (foundAbc)
      throw ({ message: "Abc found for the given abc a: " + query.where.a, code: 500 });
    const newAbc = await AbcService.create(abc);
    res.send(newAbc);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the Abc.",
      code: err.code || 500
    });
  }
};


exports.getAll = async (req, res) => {
  try {
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;

    const abc = await AbcService.getAll(page, limit);
    res.send(abc);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while retrieving the abc", code: err.code || 500
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
    const abc = await AbcService.get(query);
    if (!abc)
      throw ({ message: "Abc not found for the given abc id: " + query.where.id, code: 404 });
    res.send(abc);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while finding the abc", code: err.code || 500
    });
  }
};

exports.update = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const abc = {
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
    const foundAbc = await AbcService.get(query);
    if (!foundAbc)
      throw ({ message: "Abc not found for the given abc id: " + query.where.id, code: 500 });
    const updatedAbc = await AbcService.update(abc, query);
    res.send(updatedAbc);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while updating the Abc.", code: err.code || 500
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
    const updatedAbc = await AbcService.delete(query);
    if (updatedAbc === 1) {
      res.status(200).send({ message: "delete success for abc id: " + query.where.id, code: 200 });
    } else {
      res.status(200).send({ message: "abc not found for id: " + query.where.id, code: 200 });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while deleting the Abc.", code: err.code || 500
    });
  }
};

