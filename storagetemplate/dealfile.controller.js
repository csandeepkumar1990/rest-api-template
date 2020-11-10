const DealFileService = require('../services/dealfiles.service');

const { validationResult } = require('express-validator');

const DealFileStorage = require('../storages/dealfiles.storage');

exports.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const dealFile = {
    dealId: req.params.dealId,
    createdBy: req.body.createdBy,
    updatedBy: req.body.updatedBy
  };

  try {
    const newDealFile = await DealFileService.create(dealFile);
    let fileArr = new Array();
    if (req.files && req.files.dealFile.length > 1) {
      await DealFileStorage.storeFiles(req.files, 'dealFile', newDealFile.id, req.params.dealId);
    } else if (req.files && req.files.dealFile) {
      await DealFileStorage.storeFile(req.files.dealFile, 'dealFile', newDealFile.id, req.params.dealId);
    }

    const childQuery = {
      where: {
        id: newDealFile.id
      }
    }

    fileArr = await DealFileService.get(childQuery);

    let dealFileResponse = {};
    dealFileResponse.files = fileArr;
    res.send({
      'dealFilefile': dealFileResponse
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the Deal File.",
      code: err.code || 500
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 10;
    const dealId = req.params.dealId;
    const query = {
      offset: ((page - 1) * limit),
      limit: Number(limit),
      subQuery: false,
      where: {
        dealId: dealId
      }
    }
    const dealFile = await DealFileService.getAll(query);
    res.send(dealFile);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while retrieving the Deal File", code: err.code || 500
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
    const contact = await ContactService.get(query);
    if (!contact)
      throw ({ message: "Contact found for the given contact id: " + query.where.id, code: 500 });
    const dealFile = await DealFileService.get(req.params.dealId, req.params.dealFileId);
    res.send(dealFile);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while finding the Deal File", code: err.code || 500
    });
  }
};

exports.update = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let dealFile = {
    dealId: req.params.dealId,
    createdBy: req.body.createdBy,
    updatedBy: req.body.updatedBy
  };

  const query = {
    where: {
      dealId: req.params.dealId,
      id: req.params.dealFileId
    }
  }

  try {
    const updateDealFile = await DealFileService.update(dealFile, query);
    res.send(updateDealFile);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while updating the Deal File.", code: err.code || 500
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
        dealId: req.params.dealId,
        id: req.params.dealFileId
      }
    }
    const updatedDealFile = await DealFileService.delete(query);
    if (updatedDealFile === 1) {
      res.status(200).send({ message: "delete success for DealfileId: " + req.params.dealFileId, code: 200 });
    } else {
      throw ({ message: "Unable to delete dealfiles for DealfileId : " + req.params.dealFileId, code: 500 });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while deleting the Deal File.", code: err.code || 500
    });
  }
};

