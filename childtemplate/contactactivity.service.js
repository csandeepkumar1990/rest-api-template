const db = require("../models");
const ContactActivityModel = db.contactactivitysModel
const ContactModel = db.contactsModel


exports.create = async (contactActivity) => {
    const t = await db.sequelize.transaction();
    try {
        let newContactActivity = await ContactActivityModel.create(contactActivity);
        await t.commit();
        return newContactActivity;

    } catch (err) {
        await t.rollback();
        throw ({ message: err.message || 'Error occurred while creating the Contact Activity: ', code: err.code || 500 });
    }
}

exports.getAll = async (page, limit, contactId) => {
    const t = await db.sequelize.transaction();
    try {
        const query = {
            offset: ((page - 1) * limit),
            limit: Number(limit),
            subQuery: false,
            where: {
                contactId: contactId
            }
        }
        const activity = await ContactActivityModel.findAll(query, { transaction: t })
        await t.commit();
        return activity;
    } catch (err) {
        await t.rollback();
        throw ({ message: err.message || 'Error occurred while retrieving the Contact Activitys.', code: err.code || 500 });
    }
}

exports.get = async (query) => {
    const t = await db.sequelize.transaction();
    try {
       
        const activity = await ContactActivityModel.findOne(query, { transaction: t });
        await t.commit();
        return activity;
    } catch (err) {
         await t.rollback();
        throw ({ message: err.message || 'Error occurred while retrieving the contactactivity.', code: err.code || 500 });
    }
}

exports.update = async (data, query) => {
    const t = await db.sequelize.transaction();
    try {
      
        let updatedContactActivity = await ContactActivityModel.update(data, query, { transaction: t });
        updatedContactActivity = await ContactActivityModel.findOne(query);
        await t.commit();
        return updatedContactActivity;
    } catch (err) {
        await t.rollback();
        throw ({ message: err.message || 'Error occurred while updating the Contact Activity', code: err.code || 500 });
    }
}

exports.delete = async (query) => {
    const t = await db.sequelize.transaction();
    try {
        var updatedContactActivity =await ContactActivityModel.destroy(query, { transaction: t });
        await t.commit();
        return updatedContactActivity;
    } catch (err) {
        // await t.rollback();
        throw ({ message: err.message || "Error occurred while deleting the Contact Activity.", code: err.code || 500 });
    }
}