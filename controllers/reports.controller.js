const { validationResult } = require('express-validator');

const ReportsService = require('../services/reports.service');

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const reports = {
    reportid: req.body.reportid,
    name1: req.body.name12,
















    createdBy: req.body.createdBy
  };

  try {
    const query = {
      where: {
        reportid: req.body.reportid
      }
    }
    const foundReports = await ReportsService.get(query);
    if (foundReports)
      throw ({ message: "Reports found for the given reports reportid: " + query.where.reportid, code: 500 });
    const newReports = await ReportsService.create(reports);
    res.send(newReports);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the Reports.",
      code: err.code || 500
    });
  }
};


exports.getAll = async (req, res) => {
  try {
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;

    const reports = await ReportsService.getAll(page, limit);
    res.send(reports);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while retrieving the reports", code: err.code || 500
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
    const reports = await ReportsService.get(query);
    if (!reports)
      throw ({ message: "Reports not found for the given reports id: " + query.where.id, code: 404 });
    res.send(reports);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while finding the reports", code: err.code || 500
    });
  }
};

exports.update = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const reports = {
      reportid: req.body.reportid,
      name1: req.body.name1,
















      updatedBy: req.body.updatedBy
    }

    const query = {
      where: {
        id: req.params.id
      }

    }
    const foundReports = await ReportsService.get(query);
    if (!foundReports)
      throw ({ message: "Reports not found for the given reports id: " + query.where.id, code: 500 });
    const updatedReports = await ReportsService.update(reports, query);
    res.send(updatedReports);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while updating the Reports.", code: err.code || 500
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
    const updatedReports = await ReportsService.delete(query);
    if (updatedReports === 1) {
      res.status(200).send({ message: "delete success for reports id: " + query.where.id, code: 200 });
    } else {
      res.status(200).send({ message: "reports not found for id: " + query.where.id, code: 200 });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while deleting the Reports.", code: err.code || 500
    });
  }
};

