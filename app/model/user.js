"use strict";

module.exports = app => {
  const { STRING, INTEGER, DATE, ENUM } = app.Sequelize;

  const User = app.model.define("user", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    password: STRING(30),
    create_time: DATE,
    gender: ENUM(["男", "女", "其他"]),
    avatarUrl: STRING(100),
    introduction: STRING(100)
    // created_at: DATE,
    // updated_at: DATE
  });

  return User;
};
