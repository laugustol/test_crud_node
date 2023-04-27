const { Sequelize } = require("sequelize");
const sequelize = require("../database");
const Users = require("./users");

const Posts = sequelize.define("post", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" }
    },
    title: Sequelize.STRING,
    description: Sequelize.TEXT,
    status: { type: Sequelize.INTEGER, default: 1 }
});

Users.hasMany(Posts, { foreignKey: "user_id" });
Posts.belongsTo(Users, { foreignKey: "id" });

module.exports = Posts;
