const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: String,
  email: String,
  password: String,
  role: String,
  matricula: String,
  curso: String,
  telefone: String,
  cargaHoraria: Number,
  semestre: Number
});

module.exports = mongoose.model('User', userSchema);
