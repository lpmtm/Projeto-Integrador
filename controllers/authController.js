// authController.js
const { generateToken } = require('../utils/jwt.js');
const User = require('../models/User.js'); // Certifique-se que este é seu modelo Mongoose

async function login(req, res) {
  const { email, password } = req.body;
  try {
    // CORRIGIDO: Buscar usuário com sintaxe Mongoose
    const user = await User.findOne({ email: email });
    // Ou de forma mais curta, se a variável e o campo têm o mesmo nome:
    // const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: true, message: 'Credenciais inválidas (usuário não encontrado)' });
    }


    if (user.password !== password) {
      return res.status(401).json({ error: true, message: 'Credenciais inválidas (senha incorreta)' });
    }

    const token = generateToken({
      id: user._id,          // CORRIGIDO: MongoDB usa _id por padrão
      email: user.email,
      role: user.role,
      nome: user.nome,
      curso: user.curso,
      matricula: user.matricula,
      semestre: user.semestre,
      telefone: user.telefone
    });
 

    console.log('Login bem-sucedido. Token gerado.');
    res.json({ token }); // Envia apenas o token, como esperado pelo seu frontend

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: true, message: 'Erro no servidor durante o login.' });
  }
}

module.exports = {
  login
};