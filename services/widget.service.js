const db = require("../models");
const WidgetModel = db.widgetModel;

exports.create = async (widget) => {
    try {
        const t = await db.sequelize.transaction();
        const newWidget = await WidgetModel.create(widget, { transaction: t });
        await t.commit();
        return newWidget;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while creating the Widget: ', code: err.code || 500 });
    }
}

exports.update = async (data, query) => {

    try {
        const t = await db.sequelize.transaction();
        let updatedWidget = await WidgetModel.update(data, query, { transaction: t });
        updatedWidget = await WidgetModel.findOne(query, { transaction: t });
        await t.commit();
        return updatedWidget;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while updating the Widget', code: err.code || 500 });
    }
}


exports.delete = async (query) => {
    const t = await db.sequelize.transaction();
    try {
        let widget = await WidgetModel.destroy(query, { transaction: t });
        await t.commit();
        return widget;
    } catch (err) {
        await t.rollback();
        throw ({ message: err.message || "Error occurred while deleting the Widget.", code: err.code || 500 });
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
        const widgets = await WidgetModel.findAll(query, { transaction: t });
        await t.commit();
        return widgets;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while retrieving the Widgets.', code: err.code || 500 });
    }
}


exports.get = async (query) => {
    try {
        const t = await db.sequelize.transaction();
        const widget = await WidgetModel.findOne(query, { transaction: t });
        await t.commit();
        return widget;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while retrieving the Widget.', code: err.code || 500 });
    }
}
