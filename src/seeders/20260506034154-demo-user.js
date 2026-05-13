'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      email: "TranTuanDat",
      password: "dat123",
      role: "admin",
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
