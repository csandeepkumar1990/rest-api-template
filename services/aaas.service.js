const db = require("../models");
const AaasModel = db.aaasModel;

exports.create = async (aaas) => {
    try {
        const t = await db.sequelize.transaction();
        const newAaas = await AaasModel.create(aaas, { transaction: t });
        await t.commit();
        return newAaas;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while creating the Aaas: ', code: err.code || 500 });
    }
}

exports.update = async (data, query) => {

    try {
        const t = await db.sequelize.transaction();
        let updatedAaas = await AaasModel.update(data, query, { transaction: t });
        updatedAaas = await AaasModel.findOne(query, { transaction: t });
        await t.commit();
        return updatedAaas;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while updating the Aaas', code: err.code || 500 });
    }
}


exports.delete = async (query) => {
    const t = await db.sequelize.transaction();
    try {
        let aaas = await AaasModel.destroy(query, { transaction: t });
        await t.commit();
        return aaas;
    } catch (err) {
        await t.rollback();
        throw ({ message: err.message || "Error occurred while deleting the Aaas.", code: err.code || 500 });
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
        const aaass = await AaasModel.findAll(query, { transaction: t });
        await t.commit();
        return aaass;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while retrieving the Aaass.', code: err.code || 500 });
    }
}


exports.get = async (query) => {
    try {
        const t = await db.sequelize.transaction();
        const aaas = await AaasModel.findOne(query, { transaction: t });
        await t.commit();
        return aaas;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while retrieving the Aaas.', code: err.code || 500 });
    }
}
