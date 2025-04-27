const Sequelize = require("sequelize");
const connection = require("../database/database");
const Course = require("../courses/Course");

const Boletim = connection.define('boletins', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Boletim.sync({force: true});

Course.hasMany(Boletim); 
Boletim.belongsTo(Course); 


module.exports = Boletim;
