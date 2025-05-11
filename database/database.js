const Sequelize = require("sequelize");

const connection = new Sequelize('modelo', 'root', '010203',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
