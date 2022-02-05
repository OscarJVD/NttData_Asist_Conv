'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      isUsed: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      desc: {
        type: Sequelize.STRING,
        allowNull: false
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // image: {
      //   type: Sequelize.STRING,
      //   allowNull: true,
      // },
      weight: {
        type: Sequelize.STRING,
        allowNull: true
      },
      dimensions: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      checked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      inStock: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      sold: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
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
    await queryInterface.dropTable('Products');
  }
};