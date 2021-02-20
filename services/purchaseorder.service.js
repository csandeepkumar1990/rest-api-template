const db = require("../models");
const PurchaseorderModel = db.purchaseorderModel;

exports.create = async (purchaseorder) => {
    try {
        const t = await db.sequelize.transaction();
        const newPurchaseorder = await PurchaseorderModel.create(purchaseorder, { transaction: t });
        await t.commit();
        return newPurchaseorder;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while creating the Purchaseorder: ', code: err.code || 500 });
    }
}

exports.update = async (data, query) => {

    try {
        const t = await db.sequelize.transaction();
        let updatedPurchaseorder = await PurchaseorderModel.update(data, query, { transaction: t });
        updatedPurchaseorder = await PurchaseorderModel.findOne(query, { transaction: t });
        await t.commit();
        return updatedPurchaseorder;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while updating the Purchaseorder', code: err.code || 500 });
    }
}


exports.delete = async (query) => {
    const t = await db.sequelize.transaction();
    try {
        let purchaseorder = await PurchaseorderModel.destroy(query, { transaction: t });
        await t.commit();
        return purchaseorder;
    } catch (err) {
        await t.rollback();
        throw ({ message: err.message || "Error occurred while deleting the Purchaseorder.", code: err.code || 500 });
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
        const purchaseorders = await PurchaseorderModel.findAll(query, { transaction: t });
        await t.commit();
        return purchaseorders;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while retrieving the Purchaseorders.', code: err.code || 500 });
    }
}


exports.get = async (query) => {
    try {
        const t = await db.sequelize.transaction();
        const purchaseorder = await PurchaseorderModel.findOne(query, { transaction: t });
        await t.commit();
        return purchaseorder;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while retrieving the Purchaseorder.', code: err.code || 500 });
    }
}
