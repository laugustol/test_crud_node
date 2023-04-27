const { Sequelize } = require("sequelize");
const sequelize = require("../database");
const Users = require("./users");
const Posts = require("./posts");

const Reviews = sequelize.define("review", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    post_id: {
        type: Sequelize.INTEGER,
        references: { model: "posts", key: "id" }
    },
    user_id: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" }
    },
    comment: Sequelize.TEXT
});

Posts.hasMany(Reviews, { foreignKey: "post_id" });
Reviews.belongsTo(Posts, { foreignKey: "id" });

Users.hasMany(Reviews, { foreignKey: "user_id" });
Reviews.belongsTo(Users, { foreignKey: "id" });
module.exports = Reviews;
