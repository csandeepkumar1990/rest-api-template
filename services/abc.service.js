const db = require("../models");
const AbcModel = db.abcModel;

exports.create = async (abc) => {
    try {
        const t = await db.sequelize.transaction();
        const newAbc = await AbcModel.create(abc, { transaction: t });
        await t.commit();
        return newAbc;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while creating the Abc: ', code: err.code || 500 });
    }
}

exports.update = async (data, query) => {

    try {
        const t = await db.sequelize.transaction();
        let updatedAbc = await AbcModel.update(data, query, { transaction: t });
        updatedAbc = await AbcModel.findOne(query, { transaction: t });
        await t.commit();
        return updatedAbc;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while updating the Abc', code: err.code || 500 });
    }
}


exports.delete = async (query) => {
    const t = await db.sequelize.transaction();
    try {
        let abc = await AbcModel.destroy(query, { transaction: t });
        await t.commit();
        return abc;
    } catch (err) {
        await t.rollback();
        throw ({ message: err.message || "Error occurred while deleting the Abc.", code: err.code || 500 });
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
        const abcs = await AbcModel.findAll(query, { transaction: t });
        await t.commit();
        return abcs;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while retrieving the Abcs.', code: err.code || 500 });
    }
}


exports.get = async (query) => {
    try {
        const t = await db.sequelize.transaction();
        const abc = await AbcModel.findOne(query, { transaction: t });
        await t.commit();
        return abc;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while retrieving the Abc.', code: err.code || 500 });
    }
}
