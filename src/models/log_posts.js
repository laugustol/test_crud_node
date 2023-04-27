const { Sequelize } = require("sequelize");
const sequelize = require("../database");
const Users = require("./users");
const Posts = require("./posts");

const Log_posts = sequelize.define("log_posts", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    post_id: {
        type: Sequelize.INTEGER,
        references: { model: "posts", key: "id" }
    },
    user_id: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" }
    },
    request_action: Sequelize.STRING
});

Posts.hasMany(Log_posts, { foreignKey: "post_id" });
Log_posts.belongsTo(Posts, { foreignKey: "id" });

Users.hasMany(Log_posts, { foreignKey: "user_id" });
Log_posts.belongsTo(Users, { foreignKey: "id" });
module.exports = Log_posts;
