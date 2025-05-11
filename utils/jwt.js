const jwt = require('jsonwebtoken');
const authConfig = require('../config/authConfig.js');

// Função para gerar um token JWT
function generateToken(payload) {
  return jwt.sign(payload, authConfig.API_SECRET, {
    expiresIn: authConfig.expiresIn,
  });
}

// Função para verificar um token JWT
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, authConfig.API_SECRET);
    return decoded;
  } catch (error) {
    throw error;
  }
}

// Exporta as funções
module.exports = {
  generateToken,
  verifyToken
};