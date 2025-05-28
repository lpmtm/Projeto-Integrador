// models/Boletim.js
const mongoose = require('mongoose');

const materiaSchema = new mongoose.Schema({
  nomeMateria: {
    type: String,
    required: true
  },
  nota: {
    type: Number,
    default: null 
  }
}, { _id: false });

const boletimSchema = new mongoose.Schema({
  aluno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  nomeAluno:{
    type: String,
    required: true
  },
  curso: {
    type: String,
    required: true
  },
  semestre: { 
    type: Number,
    required: true
  },
  materias: [materiaSchema] 
}, { timestamps: true });

module.exports = mongoose.model('Boletim', boletimSchema);