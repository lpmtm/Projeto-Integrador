const { generateToken } = require('../utils/jwt.js');
const users = require('../models/User.js');

async function login(req, res) {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user || user.password !== password) {
    return res.status(401).json({ error: true, message: 'Credenciais inválidas' });
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role
  });

  console.log('Login bem-sucedido. Token gerado:', token);

  res.json({ token });
}

module.exports = {
  login
};