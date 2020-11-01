'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kkk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Kkk.init({
    aaa: DataTypes.STRING,
    bbb: DataTypes.STRING,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    description: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Kkk',
  });
  return Kkk;
};