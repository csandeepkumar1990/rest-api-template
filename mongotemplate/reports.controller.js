var ReportService = require('../services/reports.service');

const { validationResult } = require('express-validator');

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  
  const report = {
    field1: req.body.field1,
    field2: req.body.field2,
    field3: req.body.field3,
    insertedBy: req.body.insertedBy,
    updatedBy: req.body.updatedBy
  };

  try {
    var newReport = await ReportService.create(report);
    res.send(newReport);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the Report.",
      code: err.code || 500
    });
  }
};


exports.getAll = async (req, res) => {
  try {
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;

    var report = await ReportService.getAll(page, limit);
    res.send(report);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while retrieving the report", code: err.code || 500
    });
  }
};

exports.get = async (req, res) => {
  try {
    const query = {
      _id: req.params.reportId
    }
    var report = await ReportService.findOne(query);
    res.send(report);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while finding the report", code: err.code || 500
    });
  }
};

exports.update = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  let report = {
    field1: req.body.field1,
    field2: req.body.field2,
    field3: req.body.field3,
    reportName: req.body.reportName,
    insertedBy: req.body.insertedBy,
    updatedBy: req.body.updatedBy
  };

  var keys = Object.keys(report);
  for (var i = 0; i < keys.length; i++) {
    if (!report[keys[i]]) {
      delete report[keys[i]];
    }
  }

  const reportQuery = {
    _id: req.params.reportId
  }

  try {
    var updatedReport = await ReportService.update(report, reportQuery);
    res.send(updatedReport);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while updating the report.", code: err.code || 500
    });
  }
};

exports.delete = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    var updatedReport = await ReportService.delete(req.params.reportId);
    res.send(updatedReport);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while deleting the report.", code: err.code || 500
    });
  }
};

