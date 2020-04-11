"use strict";

module.exports = app => {
  const { STRING, INTEGER, DATE, ENUM } = app.Sequelize;

  const Note = app.model.define("note", {
    noteId: { type: INTEGER, primaryKey: true, autoIncrement: true },
    userId: STRING(11),
    title: STRING(30),
    content: STRING(1000),
    pictureUrl: STRING(1000),
    // created_at: DATE,
    // updated_at: DATE
  });

  Note.associate = function(){
    app.model.Note.belongsTo(app.model.User,{foreignKey: 'userId',targetKey: 'id'})
  }

  return Note;
};