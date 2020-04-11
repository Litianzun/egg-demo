"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, ENUM } = Sequelize;
    await queryInterface.createTable("notes", {
      noteId: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userId: STRING(11),
      title: STRING(30),
      content: STRING(1000),
      pictureUrl: STRING(1000),
      created_at: DATE,
      updated_at: DATE,
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable("notes");
  }
};
