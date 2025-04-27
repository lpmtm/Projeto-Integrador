const Sequelize = require("sequelize");
const connection = require("../database/database");

const Course = connection.define('courses',{
title:{
    type: Sequelize.STRING,
    allowNull: false
},slug:{
    type: Sequelize.STRING,
    allowNull: false
}
})

Course.sync({force: true})

module.exports = Course;