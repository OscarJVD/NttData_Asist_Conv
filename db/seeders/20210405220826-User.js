'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      name: "seederDataTest",
      email: "seederDataTest2", // Campo unique
      password: "seederDataTest",
      role:"seederDataTest",
      root:"seederDataTest",
      avatar:"seederDataTest",
      createdAt: new Date,
      updatedAt: new Date

    }], {});

  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
