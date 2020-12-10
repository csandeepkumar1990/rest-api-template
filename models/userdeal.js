'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userdeal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  userdeal.init({
    userId: DataTypes.STRING,
    aa: DataTypes.STRING,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    description: DataTypes.STRING,
    insertedBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userdeal',
  });
  return userdeal;
};