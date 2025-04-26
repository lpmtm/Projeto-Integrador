const Sequelize = require("sequelize");

const connection = new Sequelize('modelo', 'root', '126357',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
