const UserModel = require("../models/users.model");

exports.create = async (user) => {
    try {
        const userQuery = {
            userName: user.userName
        }
        const userExists = await UserModel.findOne(userQuery);
        if (userExists) {
            throw ({ message: 'user is already exists with the given name for id: ' + userExists._id, code: 400 });
        }

        let newUser = new UserModel(user);
        newUser = await newUser.save();
        return newUser;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while creating the user: ', code: err.code || 500 });
    }
}


exports.update = async (data, query) => {

    try {
        const user = await UserModel.findOne(query);
        if (!user)
            throw ({ message: "User not found for id: " + query._id, code: 404 });
        let updatedUser = await UserModel.findOneAndUpdate(query, data);
        updatedUser = await UserModel.findById(user._id);
        return updatedUser;
    } catch (err) {
        if (err.kind === "ObjectId") {
            throw ({
                message: "User not found for id: " + query._id,
                code: 404
            });
        }
        throw ({ message: err.message || 'Error occurred while updating the User', code: err.code || 500 });
    }
}

exports.delete = async (userId) => {

    try {
        const query = {
            _id: userId
        }
        let user = await UserModel.findOne(query);
        if (!user) {
            throw ({ message: "User not found for id: " + query._id, code: 404 });
        }

        await UserModel.findOneAndDelete(query);
        user = await UserModel.find(query);
        if (user.length === 0) {
            throw ({ message: "delete success for id: " + userId, code: 200 });
        }
        return user;
    } catch (err) {
        if (err.kind === "ObjectId") {
            throw ({
                message: "User not found for id: " + userId,
                code: 404
            });
        }
        throw ({ message: err.message || "Error occurred while deleting the User.", code: err.code || 500 });
    }
}


exports.getAll = async (page, limit) => {
    try {
        const users = await UserModel.find().skip((Number(page) - 1) * (Number(limit))).limit(Number(limit));
        return users;
    } catch (err) {
        throw ({ message: err.message || 'Error occurred while retrieving the Users.', code: err.code || 500 });
    }
}


exports.findOne = async (query) => {
    try {
        const user = await UserModel.findOne(query);
        if (!user)
            throw ({ message: "User not found for the given user id: " + query._id, code: 404 });
        return user;
    } catch (err) {
        if (err.kind === "ObjectId") {
            throw ({
                message: "User not found for id: " + query._id,
                code: 404
            });
        }
        throw ({ message: err.message || 'Error occurred while retrieving the User.', code: err.code || 500 });
    }
}
