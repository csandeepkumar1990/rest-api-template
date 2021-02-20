const { validationResult } = require('express-validator');

const TenantwidgetService = require('../services/tenantwidget.service');

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const tenantwidget = {
    appId: req.body.appId,
    widgetId: req.body.widgetId,
    tenantId: req.body.tenantId,















    createdBy: req.body.createdBy
  };

  try {
    const query = {
      where: {
        appId: req.body.appId
      }
    }
    const foundTenantwidget = await TenantwidgetService.get(query);
    if (foundTenantwidget)
      throw ({ message: "Tenantwidget found for the given tenantwidget appId: " + query.where.appId, code: 500 });
    const newTenantwidget = await TenantwidgetService.create(tenantwidget);
    res.send(newTenantwidget);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the Tenantwidget.",
      code: err.code || 500
    });
  }
};


exports.getAll = async (req, res) => {
  try {
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;

    const tenantwidget = await TenantwidgetService.getAll(page, limit);
    res.send(tenantwidget);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while retrieving the tenantwidget", code: err.code || 500
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
    const tenantwidget = await TenantwidgetService.get(query);
    if (!tenantwidget)
      throw ({ message: "Tenantwidget not found for the given tenantwidget id: " + query.where.id, code: 404 });
    res.send(tenantwidget);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while finding the tenantwidget", code: err.code || 500
    });
  }
};

exports.update = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const tenantwidget = {
      appId: req.body.appId,
      widgetId: req.body.widgetId,
      tenantId: req.body.tenantId,















      updatedBy: req.body.updatedBy
    }

    const query = {
      where: {
        id: req.params.id
      }

    }
    const foundTenantwidget = await TenantwidgetService.get(query);
    if (!foundTenantwidget)
      throw ({ message: "Tenantwidget not found for the given tenantwidget id: " + query.where.id, code: 500 });
    const updatedTenantwidget = await TenantwidgetService.update(tenantwidget, query);
    res.send(updatedTenantwidget);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while updating the Tenantwidget.", code: err.code || 500
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
    const updatedTenantwidget = await TenantwidgetService.delete(query);
    if (updatedTenantwidget === 1) {
      res.status(200).send({ message: "delete success for tenantwidget id: " + query.where.id, code: 200 });
    } else {
      res.status(200).send({ message: "tenantwidget not found for id: " + query.where.id, code: 200 });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while deleting the Tenantwidget.", code: err.code || 500
    });
  }
};

