// authController.js
const { generateToken } = require('../utils/jwt.js');
// Importe o modelo User a partir do objeto db exportado por models/index.js
const { User } = require('../models'); // Sequelize automaticamente procura por index.js em ../models

async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Agora User.findOne deve funcionar corretamente
    const user = await User.findOne({ where: { email } });

    if (!user) { // É uma boa prática verificar se o usuário existe primeiro
      return res.status(401).json({ error: true, message: 'Credenciais inválidas' });
    }
    
    // IMPORTANTE: Verificação de senha!
    // Você está comparando senhas em texto plano (user.password !== password).
    // Isso é MUITO INSEGURO. Você deve usar bcrypt ou argon2 para hash de senhas.
    // Exemplo com bcrypt (requer instalação e configuração):
    // const isValidPassword = await bcrypt.compare(password, user.password);
    // if (!isValidPassword) {
    //   return res.status(401).json({ error: true, message: 'Credenciais inválidas' });
    // }

    if (user.password !== password) { // Mantenha por agora, mas planeje mudar para hash
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