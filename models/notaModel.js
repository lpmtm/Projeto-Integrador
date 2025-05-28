const db = require('../database/database'); // Ajuste o caminho conforme sua estrutura

class Nota {
    static async getNotasByAlunoId(alunoId) {
        try {
            // Adapte esta query para os nomes reais de suas tabelas e colunas
            const result = await db.query(
                `SELECT disciplina, nota
                 FROM notas
                 WHERE aluno_id = $1
                 ORDER BY disciplina`,
                [alunoId]
            );
            return result.rows; // Retorna um array de objetos { disciplina: '...', nota: X.X }
        } catch (error) {
            console.error('Erro ao buscar notas do aluno:', error);
            throw error;
        }
    }
}

module.exports = Nota;