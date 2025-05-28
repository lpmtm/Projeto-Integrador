// src/services/geminiService.js

const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config(); // Garante que as variáveis de ambiente estão carregadas

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
    console.error("GEMINI_API_KEY não está configurada no arquivo .env. Por favor, adicione-a.");
    process.exit(1); // Encerra o processo se a chave da API não for encontrada
}

const genAI = new GoogleGenerativeAI(API_KEY);

async function gerarRelatorioTextoGemini(alunoNome, notas) {
    if (!notas || notas.length === 0) {
        return `Olá, ${alunoNome}! Não encontramos notas para gerar o relatório textual detalhado.`;
    }

    let prompt = `Gere um relatório detalhado e explicativo sobre o desempenho acadêmico de ${alunoNome} com base nas seguintes notas:\n\n`;

    notas.forEach(nota => {
        prompt += `- Disciplina: ${nota.disciplina}, Nota: ${nota.nota}\n`;
    });

    prompt += `\nPor favor, analise a situação do aluno em cada disciplina, destacando pontos fortes e fracos, e ofereça sugestões de melhoria de forma clara e objetiva. Use um tom educacional, encorajador e profissional.`;

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Erro ao gerar relatório de texto com Gemini:', error);
        return `Desculpe, ocorreu um erro ao gerar o relatório textual. Por favor, tente novamente mais tarde. (${error.message})`;
    }
}

module.exports = {
    gerarRelatorioTextoGemini,
};