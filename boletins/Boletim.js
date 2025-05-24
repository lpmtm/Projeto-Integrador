const Sequelize = require("sequelize");
const connection = require("../database/connection"); // Agora vem do novo arquivo

const Boletim = connection.define("Boletim", {
  materia: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  semestre: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nota: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  UserId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Boletim;
