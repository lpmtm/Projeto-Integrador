const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const boletimController = require('../controllers/boletimController.js')

// Rota do Boletim
router.get('/', authMiddleware, boletimController.getMeuBoletim);

// Rota de login
router.post('/login', authController.login);

// Rota protegida
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Acesso permitido', user: req.user });
});

//module.exports = router;





const Nota = require('../models/notaModel'); // Ajuste o caminho
const geminiService = require('../services/geminiService'); // Ajuste o caminho

// Rota para buscar os relatórios de um aluno
// Você precisará de alguma forma de identificar o aluno (e.g., via sessão, token JWT, ou query param para teste)
router.get('/relatorios/:alunoId', async (req, res) => {
    const alunoId = req.params.alunoId;

    // TODO: Em um ambiente de produção, você PRECISA implementar autenticação e autorização aqui.
    // Garanta que o usuário logado tem permissão para ver as notas deste alunoId.
    // Exemplo: if (req.user.id !== alunoId) return res.status(403).send('Acesso negado');

    try {
        // 1. Buscar as notas do aluno no banco de dados
        const notas = await Nota.getNotasByAlunoId(alunoId);

        // Para simular o nome do aluno, você pode buscar do BD também
        // Ou passar o nome diretamente se já o tiver na sua sessão/token
        const alunoNome = `Aluno ${alunoId}`; // Substitua pela busca real do nome do aluno

        // 2. Gerar o relatório de texto com Gemini
        const relatorioTexto = await geminiService.gerarRelatorioTextoGemini(alunoNome, notas);

        // 3. Preparar dados para o gráfico (enviar para o frontend)
        const dadosGrafico = {
            labels: notas.map(n => n.disciplina),
            data: notas.map(n => parseFloat(n.nota)) // Garanta que a nota seja um número
        };

        res.json({
            success: true,
            relatorioTexto: relatorioTexto,
            dadosGrafico: dadosGrafico
        });

    } catch (error) {
        console.error('Erro na rota de relatórios:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor ao gerar relatórios.',
            error: error.message
        });
    }
});

module.exports = router;