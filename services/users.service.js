const db = require("../models");
const UsersModel = db.usersModel;

exports.create = async (users) => {
    try {
        const t = await db.sequelize.transaction();
        const newUsers = await UsersModel.create(users, { transaction: t });
        await t.commit();
        return newUsers;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while creating the Users: ', code: err.code || 500 });
    }
}

exports.update = async (data, query) => {

    try {
        const t = await db.sequelize.transaction();
        let updatedUsers = await UsersModel.update(data, query, { transaction: t });
        updatedUsers = await UsersModel.findOne(query, { transaction: t });
        await t.commit();
        return updatedUsers;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while updating the Users', code: err.code || 500 });
    }
}


exports.delete = async (query) => {
    const t = await db.sequelize.transaction();
    try {
        let users = await UsersModel.destroy(query, { transaction: t });
        await t.commit();
        return users;
    } catch (err) {
        await t.rollback();
        throw ({ message: err.message || "Error occurred while deleting the Users.", code: err.code || 500 });
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
        const userss = await UsersModel.findAll(query, { transaction: t });
        await t.commit();
        return userss;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while retrieving the Userss.', code: err.code || 500 });
    }
}


exports.get = async (query) => {
    try {
        const t = await db.sequelize.transaction();
        const users = await UsersModel.findOne(query, { transaction: t });
        await t.commit();
        return users;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while retrieving the Users.', code: err.code || 500 });
    }
}
