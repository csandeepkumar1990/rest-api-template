const db = require("../models");
const PurchaseordermasterModel = db.purchaseordermasterModel;

exports.create = async (purchaseordermaster) => {
    try {
        const t = await db.sequelize.transaction();
        const newPurchaseordermaster = await PurchaseordermasterModel.create(purchaseordermaster, { transaction: t });
        await t.commit();
        return newPurchaseordermaster;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while creating the Purchaseordermaster: ', code: err.code || 500 });
    }
}

exports.update = async (data, query) => {

    try {
        const t = await db.sequelize.transaction();
        let updatedPurchaseordermaster = await PurchaseordermasterModel.update(data, query, { transaction: t });
        updatedPurchaseordermaster = await PurchaseordermasterModel.findOne(query, { transaction: t });
        await t.commit();
        return updatedPurchaseordermaster;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while updating the Purchaseordermaster', code: err.code || 500 });
    }
}


exports.delete = async (query) => {
    const t = await db.sequelize.transaction();
    try {
        let purchaseordermaster = await PurchaseordermasterModel.destroy(query, { transaction: t });
        await t.commit();
        return purchaseordermaster;
    } catch (err) {
        await t.rollback();
        throw ({ message: err.message || "Error occurred while deleting the Purchaseordermaster.", code: err.code || 500 });
    }
}


exports.getAll = async (page, limit) => {
    try {
        const t = await db.sequelize.transaction();
        const query = {
            offset: ((page - 1) * limit),
            limit: Number(limit),
            subQuery: false
        }
        const purchaseordermasters = await PurchaseordermasterModel.findAll(query, { transaction: t });
        await t.commit();
        return purchaseordermasters;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while retrieving the Purchaseordermasters.', code: err.code || 500 });
    }
}


exports.get = async (query) => {
    try {
        const t = await db.sequelize.transaction();
        const purchaseordermaster = await PurchaseordermasterModel.findOne(query, { transaction: t });
        await t.commit();
        return purchaseordermaster;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while retrieving the Purchaseordermaster.', code: err.code || 500 });
    }
}
