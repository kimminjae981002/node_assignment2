"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Products", "userId", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("Products", {
      fields: ["userId"],
      type: "foreign key",
      name: "user_product_id_fk",
      references: {
        table: "Signs",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Products", "userId");
  },
};
