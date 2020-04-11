"use strict";

module.exports = app => {
  const { STRING, INTEGER, DATE, ENUM } = app.Sequelize;

  const Follower = app.model.define("follower", {
    id: { type: INTEGER, primaryKey: true },
    userId: INTEGER,
    fans: INTEGER
    // created_at: DATE,
    // updated_at: DATE
  });

  return Follower;
};