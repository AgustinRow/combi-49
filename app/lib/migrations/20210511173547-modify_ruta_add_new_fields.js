"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.changeColumn("Ruta", "origen_id", {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
      queryInterface.changeColumn("Ruta", "destino_id", {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn("Ruta", "origen_id"),
      queryInterface.removeColumn("Ruta", "destino_id"),
    ]);
  },
};
