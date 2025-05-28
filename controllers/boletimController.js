// controllers/boletimController.js
const Boletim = require('../models/Boletim'); // Seu modelo Boletim
const User = require('../models/User');     // Seu modelo User

exports.getMeuBoletim = async (req, res) => {
  try {
    const userId = req.user.id; // Obtido do authMiddleware

    let semestreDoUsuario = req.user.semestre; // Supondo que seu token tem o semestre do User
    let cursoDoUsuario = req.user.curso;     // Supondo que seu token tem o curso do User

    // Se o token não tiver semestre/curso, buscar do User model:
    if (semestreDoUsuario === undefined || cursoDoUsuario === undefined) {
        const usuario = await User.findById(userId).select('semestre curso');
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        semestreDoUsuario = usuario.semestre;
        cursoDoUsuario = usuario.curso;
    }

    if (semestreDoUsuario === undefined || cursoDoUsuario === undefined) {
        return res.status(400).json({ message: 'Não foi possível determinar o curso ou semestre atual do usuário.' });
    }

    // 2. Buscar o boletim correspondente ao aluno, seu curso e seu semestre ATUAL
    const boletimDoSemestreAtual = await Boletim.findOne({
      aluno: userId,
      curso: cursoDoUsuario,
      semestre: semestreDoUsuario
    }).populate('aluno', 'nome email'); // Opcional: popular dados do aluno se precisar no frontend

    if (!boletimDoSemestreAtual) {
      return res.status(404).json({
        message: `Nenhum boletim encontrado para o ${semestreDoUsuario}º semestre do curso de ${cursoDoUsuario}. Verifique se os dados foram lançados.`
      });
    }

    // 3. Retornar os dados formatados que o frontend espera
    // O frontend espera um array de matérias, mas é bom enviar o contexto do boletim também.
    res.status(200).json({
      _id: boletimDoSemestreAtual._id,
      curso: boletimDoSemestreAtual.curso,
      semestre: boletimDoSemestreAtual.semestre,
      nomeAluno: boletimDoSemestreAtual.nomeAluno, // Se você tiver esse campo denormalizado
      materias: boletimDoSemestreAtual.materias // Este é o array [ { nomeMateria, nota }, ... ]
    });

  } catch (error) {
    console.error('Erro ao buscar boletim:', error);
    res.status(500).json({ message: 'Erro interno do servidor ao buscar boletim.' });
  }
};