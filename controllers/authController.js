// authController.js
const { generateToken } = require('../utils/jwt.js');
const { User } = require('../models');

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: true, message: 'Credenciais inválidas' });
    }
    if (user.password !== password) { // Lembre-se de usar hash de senha em produção!
        return res.status(401).json({ error: true, message: 'Credenciais inválidas' });
    }

   const token = generateToken({
      id: user.id,
      email: user.email,       // O email você já tinha
      role: user.role,         // O role você já tinha
      nome: user.nome,         // O nome você já tinha
      curso: user.curso,       // NOVO: Adicionando o curso
      matricula: user.matricula, // NOVO: Adicionando a matrícula
      semestre: user.semestre,   // NOVO: Adicionando o semestre
      telefone: user.telefone    // NOVO: Adicionando o telefone
    });
 

    console.log('Login bem-sucedido. Nome incluído no token.');
    res.json({ token });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: true, message: 'Erro no servidor durante o login.' });
  }
}

module.exports = {
  login
};