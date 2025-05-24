const { generateToken } = require('../utils/jwt.js');
const User = require('../models/User.js');

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

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
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: true, message: 'Erro no servidor' });
  }
}

module.exports = {
  login
};
