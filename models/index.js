// models/index.js
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development'; // Você pode configurar diferentes ambientes se precisar

// Importe sua configuração de conexão Sequelize
const sequelize = require('../database/database.js'); // Ajuste o path se necessário

const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    // Chame a função exportada pelo seu arquivo de modelo (ex: User.js)
    // passando a instância do sequelize e DataTypes.
    // Seu User.js já requer DataTypes, então só sequelize é necessário.
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize; // Adiciona a instância do sequelize ao objeto db
db.Sequelize = Sequelize; // Adiciona a classe Sequelize ao objeto db

module.exports = db;