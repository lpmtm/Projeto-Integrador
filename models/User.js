// models/User.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    matricula: DataTypes.STRING,
    curso: DataTypes.STRING,
    cargaHoraria: DataTypes.INTEGER,
    semestre: DataTypes.INTEGER
  });

  return User;
};
