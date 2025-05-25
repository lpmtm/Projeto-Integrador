const { Sequelize } = require("sequelize");

const connection = new Sequelize("modelo", "root", "adimin", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
