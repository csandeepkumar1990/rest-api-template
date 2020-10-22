'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PAYMENTuser1 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PAYMENTuser1.init({
    user1: DataTypes.STRING,
    expr1: DataTypes.STRING,
    expre3: DataTypes.STRING,
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    description: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PAYMENTuser1',
  });
  return PAYMENTuser1;
};