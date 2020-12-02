'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Tests.init({
    scanTubeId: DataTypes.STRING,
    cqValue: DataTypes.STRING,
    sampleQuality: DataTypes.STRING,
    fluor: DataTypes.STRING,
    result: DataTypes.STRING,
    pooled: DataTypes.STRING,
    testProcedure: DataTypes.STRING,
    test: DataTypes.STRING,
    status: DataTypes.STRING,
    verifiedBy: DataTypes.STRING,
    comment: DataTypes.STRING,
    testTimestamp: DataTypes.STRING,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    description: DataTypes.STRING,
    insertedBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tests',
  });
  return Tests;
};