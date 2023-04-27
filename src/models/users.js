const { Sequelize } = require("sequelize");
const sequelize = require("../database");

const Users = sequelize.define("user", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    permission: Sequelize.STRING
});

module.exports = Users;
