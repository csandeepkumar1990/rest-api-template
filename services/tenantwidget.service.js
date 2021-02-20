const db = require("../models");
const TenantwidgetModel = db.tenantwidgetModel;

exports.create = async (tenantwidget) => {
    try {
        const t = await db.sequelize.transaction();
        const newTenantwidget = await TenantwidgetModel.create(tenantwidget, { transaction: t });
        await t.commit();
        return newTenantwidget;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while creating the Tenantwidget: ', code: err.code || 500 });
    }
}

exports.update = async (data, query) => {

    try {
        const t = await db.sequelize.transaction();
        let updatedTenantwidget = await TenantwidgetModel.update(data, query, { transaction: t });
        updatedTenantwidget = await TenantwidgetModel.findOne(query, { transaction: t });
        await t.commit();
        return updatedTenantwidget;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while updating the Tenantwidget', code: err.code || 500 });
    }
}


exports.delete = async (query) => {
    const t = await db.sequelize.transaction();
    try {
        let tenantwidget = await TenantwidgetModel.destroy(query, { transaction: t });
        await t.commit();
        return tenantwidget;
    } catch (err) {
        await t.rollback();
        throw ({ message: err.message || "Error occurred while deleting the Tenantwidget.", code: err.code || 500 });
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
        const tenantwidgets = await TenantwidgetModel.findAll(query, { transaction: t });
        await t.commit();
        return tenantwidgets;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while retrieving the Tenantwidgets.', code: err.code || 500 });
    }
}


exports.get = async (query) => {
    try {
        const t = await db.sequelize.transaction();
        const tenantwidget = await TenantwidgetModel.findOne(query, { transaction: t });
        await t.commit();
        return tenantwidget;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while retrieving the Tenantwidget.', code: err.code || 500 });
    }
}
