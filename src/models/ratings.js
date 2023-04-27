const { Sequelize } = require("sequelize");
const sequelize = require("../database");
const Users = require("./users");
const Posts = require("./posts");

const Ratings = sequelize.define("rating", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    post_id: {
        type: Sequelize.INTEGER,
        references: { model: "posts", key: "id" }
    },
    user_id: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id" }
    },
    rating: Sequelize.INTEGER
});

Posts.hasMany(Ratings, { foreignKey: "post_id" });
Ratings.belongsTo(Posts, { foreignKey: "id" });

Users.hasMany(Ratings, { foreignKey: "user_id" });
Ratings.belongsTo(Users, { foreignKey: "id" });
module.exports = Ratings;
