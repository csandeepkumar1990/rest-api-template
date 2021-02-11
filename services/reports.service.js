const db = require("../models");
const ReportsModel = db.reportsModel;

exports.create = async (reports) => {
    try {
        const t = await db.sequelize.transaction();
        const newReports = await ReportsModel.create(reports, { transaction: t });
        await t.commit();
        return newReports;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while creating the Reports: ', code: err.code || 500 });
    }
}

exports.update = async (data, query) => {

    try {
        const t = await db.sequelize.transaction();
        let updatedReports = await ReportsModel.update(data, query, { transaction: t });
        updatedReports = await ReportsModel.findOne(query, { transaction: t });
        await t.commit();
        return updatedReports;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while updating the Reports', code: err.code || 500 });
    }
}


exports.delete = async (query) => {
    const t = await db.sequelize.transaction();
    try {
        let reports = await ReportsModel.destroy(query, { transaction: t });
        await t.commit();
        return reports;
    } catch (err) {
        await t.rollback();
        throw ({ message: err.message || "Error occurred while deleting the Reports.", code: err.code || 500 });
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
        const reportss = await ReportsModel.findAll(query, { transaction: t });
        await t.commit();
        return reportss;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while retrieving the Reportss.', code: err.code || 500 });
    }
}


exports.get = async (query) => {
    try {
        const t = await db.sequelize.transaction();
        const reports = await ReportsModel.findOne(query, { transaction: t });
        await t.commit();
        return reports;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while retrieving the Reports.', code: err.code || 500 });
    }
}
