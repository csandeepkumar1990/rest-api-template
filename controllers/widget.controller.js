const { validationResult } = require('express-validator');

const WidgetService = require('../services/widget.service');

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const widget = {
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    tenantId: req.body.tenantId,














    createdBy: req.body.createdBy
  };

  try {
    const query = {
      where: {
        name: req.body.name
      }
    }
    const foundWidget = await WidgetService.get(query);
    if (foundWidget)
      throw ({ message: "Widget found for the given widget name: " + query.where.name, code: 500 });
    const newWidget = await WidgetService.create(widget);
    res.send(newWidget);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the Widget.",
      code: err.code || 500
    });
  }
};


exports.getAll = async (req, res) => {
  try {
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;

    const widget = await WidgetService.getAll(page, limit);
    res.send(widget);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while retrieving the widget", code: err.code || 500
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
    const widget = await WidgetService.get(query);
    if (!widget)
      throw ({ message: "Widget not found for the given widget id: " + query.where.id, code: 404 });
    res.send(widget);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while finding the widget", code: err.code || 500
    });
  }
};

exports.update = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const widget = {
      name: req.body.name,
      type: req.body.type,
      description: req.body.description,
      tenantId: req.body.tenantId,














      updatedBy: req.body.updatedBy
    }

    const query = {
      where: {
        id: req.params.id
      }

    }
    const foundWidget = await WidgetService.get(query);
    if (!foundWidget)
      throw ({ message: "Widget not found for the given widget id: " + query.where.id, code: 500 });
    const updatedWidget = await WidgetService.update(widget, query);
    res.send(updatedWidget);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while updating the Widget.", code: err.code || 500
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
    const updatedWidget = await WidgetService.delete(query);
    if (updatedWidget === 1) {
      res.status(200).send({ message: "delete success for widget id: " + query.where.id, code: 200 });
    } else {
      res.status(200).send({ message: "widget not found for id: " + query.where.id, code: 200 });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while deleting the Widget.", code: err.code || 500
    });
  }
};

