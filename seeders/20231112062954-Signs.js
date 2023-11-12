"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userId = await queryInterface.bulkInsert(
      "Sings",
      [
        {
          title: "test1",
          content: "test1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "test2",
          content: "test2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "test3",
          content: "test3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: ["id"] }
    );
    await queryInterface.bulkInsert("Products", [
      {
        comment: "test1",
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: userId,
      },
      {
        comment: "test2",
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: userId,
      },
      {
        comment: "test3",
        createdAt: new Date(),
        updatedAt: new Date(),
        productId: userId,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Sings", null, {});
    await queryInterface.bulkDelete("Products", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
