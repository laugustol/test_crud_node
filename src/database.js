const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("test_node", "root", "1234", {
    host: "localhost",
    dialect: "mysql"
});
module.exports = sequelize;

/*const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost/prueba", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((db) => console.log("Database is connected"))
    .catch((err) => console.log(err));*/
