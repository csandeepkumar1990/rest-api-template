const { validationResult } = require('express-validator');

const AaasService = require('../services/aaas.service');

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const aaas = {
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




    createdBy: req.body.createdBy
  };

  try {
    const query = {
      where: {
        a: req.body.a
      }
    }
    const foundAaas = await AaasService.get(query);
    if (foundAaas)
      throw ({ message: "Aaas found for the given aaas a: " + query.where.a, code: 500 });
    const newAaas = await AaasService.create(aaas);
    res.send(newAaas);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the Aaas.",
      code: err.code || 500
    });
  }
};


exports.getAll = async (req, res) => {
  try {
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;

    const aaas = await AaasService.getAll(page, limit);
    res.send(aaas);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while retrieving the aaas", code: err.code || 500
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
    const aaas = await AaasService.get(query);
    if (!aaas)
      throw ({ message: "Aaas not found for the given aaas id: " + query.where.id, code: 404 });
    res.send(aaas);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while finding the aaas", code: err.code || 500
    });
  }
};

exports.update = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const aaas = {
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




      updatedBy: req.body.updatedBy
    }

    const query = {
      where: {
        id: req.params.id
      }

    }
    const foundAaas = await AaasService.get(query);
    if (!foundAaas)
      throw ({ message: "Aaas not found for the given aaas id: " + query.where.id, code: 500 });
    const updatedAaas = await AaasService.update(aaas, query);
    res.send(updatedAaas);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while updating the Aaas.", code: err.code || 500
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
    const updatedAaas = await AaasService.delete(query);
    if (updatedAaas === 1) {
      res.status(200).send({ message: "delete success for aaas id: " + query.where.id, code: 200 });
    } else {
      res.status(200).send({ message: "aaas not found for id: " + query.where.id, code: 200 });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while deleting the Aaas.", code: err.code || 500
    });
  }
};

