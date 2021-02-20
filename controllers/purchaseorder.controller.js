const { validationResult } = require('express-validator');

const PurchaseorderService = require('../services/purchaseorder.service');

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const purchaseorder = {
    bomId: req.body.bomId,
    quantity: req.body.quantity,
    createdBy: req.body.createdBy,
    updatedBy:req.body.updatedBy,
  };

  try {
    const query = {
      where: {
        bomId: req.body.bomId
      }
    }
    const foundPurchaseorder = await PurchaseorderService.get(query);
    if (foundPurchaseorder)
      throw ({ message: "Purchaseorder found for the given purchaseorder bomId: " + query.where.bomId, code: 500 });
    const newPurchaseorder = await PurchaseorderService.create(purchaseorder);
    res.send(newPurchaseorder);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the Purchaseorder.",
      code: err.code || 500
    });
  }
};


exports.getAll = async (req, res) => {
  try {
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;

    const purchaseorder = await PurchaseorderService.getAll(page, limit);
    res.send(purchaseorder);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while retrieving the purchaseorder", code: err.code || 500
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
    const purchaseorder = await PurchaseorderService.get(query);
    if (!purchaseorder)
      throw ({ message: "Purchaseorder not found for the given purchaseorder id: " + query.where.id, code: 404 });
    res.send(purchaseorder);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while finding the purchaseorder", code: err.code || 500
    });
  }
};

exports.update = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const purchaseorder = {
      bomId: req.body.bomId,
      quantity: req.body.quantity,
     createdBy: req.body.createdBy,
      updatedBy: req.body.updatedBy
    }

    const query = {
      where: {
        id: req.params.id
      }

    }
    const foundPurchaseorder = await PurchaseorderService.get(query);
    if (!foundPurchaseorder)
      throw ({ message: "Purchaseorder not found for the given purchaseorder id: " + query.where.id, code: 500 });
    const updatedPurchaseorder = await PurchaseorderService.update(purchaseorder, query);
    res.send(updatedPurchaseorder);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while updating the Purchaseorder.", code: err.code || 500
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
    const updatedPurchaseorder = await PurchaseorderService.delete(query);
    if (updatedPurchaseorder === 1) {
      res.status(200).send({ message: "delete success for purchaseorder id: " + query.where.id, code: 200 });
    } else {
      res.status(200).send({ message: "purchaseorder not found for id: " + query.where.id, code: 200 });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while deleting the Purchaseorder.", code: err.code || 500
    });
  }
};

