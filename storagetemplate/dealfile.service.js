const db = require("../models");
const DealFileModel = db.dealfilesModel


exports.create = async (dealFile) => {
    const t = await db.sequelize.transaction();
    try {
        let newDealFile = await DealFileModel.create(dealFile, { transaction: t });
        let dealActivity = {
            dealId: dealFile.dealId,
            name: newDealFile.name,
            type: 'FILE',
            desc: newDealFile.desc,
            comment: 'Ultra CRM created a file',
            activityRefId: newDealFile.id,
            createdBy: 'ultracrm@gmail.com',
            updatedBy: 'ultracrm@gmail.com'
        }
        await t.commit();
        return newDealFile;

    } catch (err) {
        await t.rollback();
        throw ({ message: err.message || 'Error occurred while creating the Deal File: ', code: err.code || 500 });
    }
}


exports.getAll = async (query) => {
    const t = await db.sequelize.transaction();
    try {

        const file = await DealFileModel.findAll(query, { transaction: t });
        await t.commit();
        return file;
    } catch (err) {
        await t.rollback();
        throw ({ message: err.message || 'Error occurred while retrieving the Deal Files.', code: err.code || 500 });
    }
}


exports.get = async (query) => {
    const t = await db.sequelize.transaction();
    try {
        const file = await DealFileModel.findOne(query, { transaction: t });
        await t.commit();
        return file;
    } catch (err) {
        await t.rollback();
        throw ({ message: err.message || 'Error occurred while retrieving the dealfile.', code: err.code || 500 });
    }
}


exports.findOne = async (query) => {
    const t = await db.sequelize.transaction();
    try {
        const dealFile = await DealFileModel.findOne(query, { transaction: t });
        await t.commit();
        return dealFile;
    } catch (err) {
        await t.rollback();
        throw ({ message: err.message || 'Error occurred while retrieving the Magazine.', code: err.code || 500 });
    }
}


exports.update = async (data, query) => {
    const t = await db.sequelize.transaction();
    try {
        let updatedDealFile = await DealFileModel.update(data, query, { transaction: t });
        let dealActivity = {
            dealId: updatedDealFile.dealId,
            name: updatedDealFile.name,
            type: 'FILE',
            desc: updatedDealFile.desc,
            comment: 'Ultra CRM updated a file',
            activityRefId: updatedDealFile.id,
            createdBy: 'ultracrm@gmail.com',
            updatedBy: 'ultracrm@gmail.com'
        }

        updatedDealFile = await DealFileModel.findOne(query, { transaction: t });
        await t.commit();
        return updatedDealFile;
    } catch (err) {
        await t.rollback();
        throw ({ message: err.message || 'Error occurred while updating the Deal File', code: err.code || 500 });
    }
}


exports.delete = async (query) => {
    const t = await db.sequelize.transaction();
    try {


        const dealFile = await DealFileModel.destroy(query, { transaction: t });
        await t.commit();
        return dealFile;
    } catch (err) {
        await t.rollback();
        throw ({ message: err.message || "Error occurred while deleting the Deal File.", code: err.code || 500 });
    }
}

