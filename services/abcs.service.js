const db = require("../models");
const AbcsModel = db.abcsModel;

exports.create = async (abcs) => {
    try {
        const t = await db.sequelize.transaction();
        const newAbcs = await AbcsModel.create(abcs, { transaction: t });
        await t.commit();
        return newAbcs;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while creating the Abcs: ', code: err.code || 500 });
    }
}

exports.update = async (data, query) => {

    try {
        const t = await db.sequelize.transaction();
        let updatedAbcs = await AbcsModel.update(data, query, { transaction: t });
        updatedAbcs = await AbcsModel.findOne(query, { transaction: t });
        await t.commit();
        return updatedAbcs;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while updating the Abcs', code: err.code || 500 });
    }
}


exports.delete = async (query) => {
    const t = await db.sequelize.transaction();
    try {
        let abcs = await AbcsModel.destroy(query, { transaction: t });
        await t.commit();
        return abcs;
    } catch (err) {
        await t.rollback();
        throw ({ message: err.message || "Error occurred while deleting the Abcs.", code: err.code || 500 });
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
        const abcss = await AbcsModel.findAll(query, { transaction: t });
        await t.commit();
        return abcss;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while retrieving the Abcss.', code: err.code || 500 });
    }
}


exports.get = async (query) => {
    try {
        const t = await db.sequelize.transaction();
        const abcs = await AbcsModel.findOne(query, { transaction: t });
        await t.commit();
        return abcs;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while retrieving the Abcs.', code: err.code || 500 });
    }
}
