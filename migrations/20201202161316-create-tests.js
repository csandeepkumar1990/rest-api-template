'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      scanTubeId: {
        type: Sequelize.STRING
      },
      cqValue: {
        type: Sequelize.STRING
      },
      sampleQuality: {
        type: Sequelize.STRING
      },
      fluor: {
        type: Sequelize.STRING
      },
      result: {
        type: Sequelize.STRING
      },
      pooled: {
        type: Sequelize.STRING
      },
      testProcedure: {
        type: Sequelize.STRING
      },
      test: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      verifiedBy: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.STRING
      },
      testTimestamp: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      insertedBy: {
        type: Sequelize.STRING
      },
      updatedBy: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tests');
  }
};