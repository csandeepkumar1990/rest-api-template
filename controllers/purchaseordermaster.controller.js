const { validationResult } = require('express-validator');

const PurchaseordermasterService = require('../services/purchaseordermaster.service');

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const purchaseordermaster = {
    projectId: req.body.projectId,
    approvalDate: req.body.approvalDate,
    approvedBy: req.body.approvedBy,
    purchaseOrderStatus: req.body.purchaseOrderStatus,
    name: req.body.name,
    type: req.body.type,
    totalAmount: req.body.totalAmount,











    createdBy: req.body.createdBy
  };

  try {
    const query = {
      where: {
        projectId: req.body.projectId
      }
    }
    const foundPurchaseordermaster = await PurchaseordermasterService.get(query);
    if (foundPurchaseordermaster)
      throw ({ message: "Purchaseordermaster found for the given purchaseordermaster projectId: " + query.where.projectId, code: 500 });
    const newPurchaseordermaster = await PurchaseordermasterService.create(purchaseordermaster);
    res.send(newPurchaseordermaster);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the Purchaseordermaster.",
      code: err.code || 500
    });
  }
};


exports.getAll = async (req, res) => {
  try {
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;

    const purchaseordermaster = await PurchaseordermasterService.getAll(page, limit);
    res.send(purchaseordermaster);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while retrieving the purchaseordermaster", code: err.code || 500
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
    const purchaseordermaster = await PurchaseordermasterService.get(query);
    if (!purchaseordermaster)
      throw ({ message: "Purchaseordermaster not found for the given purchaseordermaster id: " + query.where.id, code: 404 });
    res.send(purchaseordermaster);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while finding the purchaseordermaster", code: err.code || 500
    });
  }
};

exports.update = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const purchaseordermaster = {
      projectId: req.body.projectId,
      approvalDate: req.body.approvalDate,
      approvedBy: req.body.approvedBy,
      purchaseOrderStatus: req.body.purchaseOrderStatus,
      name: req.body.name,
      type: req.body.type,
      totalAmount: req.body.totalAmount,











      updatedBy: req.body.updatedBy
    }

    const query = {
      where: {
        id: req.params.id
      }

    }
    const foundPurchaseordermaster = await PurchaseordermasterService.get(query);
    if (!foundPurchaseordermaster)
      throw ({ message: "Purchaseordermaster not found for the given purchaseordermaster id: " + query.where.id, code: 500 });
    const updatedPurchaseordermaster = await PurchaseordermasterService.update(purchaseordermaster, query);
    res.send(updatedPurchaseordermaster);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while updating the Purchaseordermaster.", code: err.code || 500
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
    const updatedPurchaseordermaster = await PurchaseordermasterService.delete(query);
    if (updatedPurchaseordermaster === 1) {
      res.status(200).send({ message: "delete success for purchaseordermaster id: " + query.where.id, code: 200 });
    } else {
      res.status(200).send({ message: "purchaseordermaster not found for id: " + query.where.id, code: 200 });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while deleting the Purchaseordermaster.", code: err.code || 500
    });
  }
};

