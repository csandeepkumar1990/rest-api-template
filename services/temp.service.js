const db = require("../models");
const TempModel = db.tempModel;

exports.create = async (temp) => {
    try {
        const t = await db.sequelize.transaction();
        const newTemp = await TempModel.create(temp, { transaction: t });
        await t.commit();
        return newTemp;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while creating the Temp: ', code: err.code || 500 });
    }
}

exports.update = async (data, query) => {

    try {
        const t = await db.sequelize.transaction();
        let updatedTemp = await TempModel.update(data, query, { transaction: t });
        updatedTemp = await TempModel.findOne(query, { transaction: t });
        await t.commit();
        return updatedTemp;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while updating the Temp', code: err.code || 500 });
    }
}


exports.delete = async (query) => {
    const t = await db.sequelize.transaction();
    try {
        let temp = await TempModel.destroy(query, { transaction: t });
        await t.commit();
        return temp;
    } catch (err) {
        await t.rollback();
        throw ({ message: err.message || "Error occurred while deleting the Temp.", code: err.code || 500 });
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
        const temps = await TempModel.findAll(query, { transaction: t });
        await t.commit();
        return temps;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while retrieving the Temps.', code: err.code || 500 });
    }
}


exports.get = async (query) => {
    try {
        const t = await db.sequelize.transaction();
        const temp = await TempModel.findOne(query, { transaction: t });
        await t.commit();
        return temp;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while retrieving the Temp.', code: err.code || 500 });
    }
}
