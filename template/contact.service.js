const db = require("../models");
const ContactModel = db.contactModel;

exports.create = async (contact) => {
    try {
        const t = await db.sequelize.transaction();
        const newContact = await ContactModel.create(contact, { transaction: t });
        await t.commit();
        return newContact;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while creating the Contact: ', code: err.code || 500 });
    }
}

exports.update = async (data, query) => {

    try {
        const t = await db.sequelize.transaction();
        let updatedContact = await ContactModel.update(data, query, { transaction: t });
        updatedContact = await ContactModel.findOne(query, { transaction: t });
        await t.commit();
        return updatedContact;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while updating the Contact', code: err.code || 500 });
    }
}


exports.delete = async (query) => {
    const t = await db.sequelize.transaction();
    try {
        let contact = await ContactModel.destroy(query, { transaction: t });
        await t.commit();
        return contact;
    } catch (err) {
        await t.rollback();
        throw ({ message: err.message || "Error occurred while deleting the Contact.", code: err.code || 500 });
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
        const contacts = await ContactModel.findAll(query, { transaction: t });
        await t.commit();
        return contacts;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while retrieving the Contacts.', code: err.code || 500 });
    }
}


exports.get = async (query) => {
    try {
        const t = await db.sequelize.transaction();
        const contact = await ContactModel.findOne(query, { transaction: t });
        await t.commit();
        return contact;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while retrieving the Contact.', code: err.code || 500 });
    }
}
