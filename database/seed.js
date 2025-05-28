const mongoose = require('mongoose'); // Adicionado para usar mongoose.connection.close()
const connectDB = require('./database'); // Importa a função de conexão
const User = require('../models/User'); // Model mongoose
const Boletim = require("../models/Boletim"); // Model mongoose Boletim

async function seed() {
  try {
    await connectDB(); // Conecta ao MongoDB antes de fazer qualquer operação

    console.log('--- Iniciando Seed de Usuários ---');
    const usersData = [
      {
        nome: "Eduardo",
        email: "eduardo@gmail.com",
        password: "171172", 
        matricula: "2412130074",
        curso: "Segurança da Informação", 
        telefone: "(61)0000-0000",
        cargaHoraria: 3600,
        semestre: 1,
      },
      {
        nome: "Carol",
        email: "carolinelopes@gmail.com",
        password: "123456", 
        role: "admin",
        matricula: "2412130073",
        curso: "Inteligência Artificial",
        telefone: "(61)0000-0000",
        cargaHoraria: 3000,
        semestre: 2,
      },
      {
        nome: "Ian",
        email: "ianmelo@gmail.com",
        password: "010203", 
        role: "admin",
        matricula: "2412130071",
        curso: "Desenvolvimento Web",
        telefone: "(61)0000-0000",
        cargaHoraria: 3200,
        semestre: 5,
      },
      {
        nome: "Miguel",
        email: "miguel@gmail.com",
        password: "121314", 
        role: "admin",
        matricula: "2412130072",
        curso: "Ciência de Dados",
        telefone: "(61)0000-0000",
        cargaHoraria: 3600,
        semestre: 6,
      },
    ];

    const createdUserIdsAndNames = {};

    for (const userData of usersData) {
      let user = await User.findOne({ email: userData.email });
      if (!user) {
        user = await User.create(userData);
        console.log(`✅ Usuário ${user.nome} foi criado com sucesso! ID: ${user._id}`);
      } else {
        console.log(`⚠️ Usuário com email ${user.email} já existe. ID: ${user._id}`);
      }
      createdUserIdsAndNames[user.email] = { id: user._id, nome: user.nome };
    }



    console.log('--- Seed de Usuários Concluída ---');

    console.log('\n--- Iniciando Seed de Boletins ---');
    await Boletim.deleteMany({});


    const estruturaCursos = {
      'Segurança da Informação': [
        { nomeMateria: 'Criptografia' },
        { nomeMateria: 'Gestão de Riscos' },
        { nomeMateria: 'Segurança de Redes' },
      ],
      'Inteligência Artificial': [
        { nomeMateria: 'Introdução à IA' },
        { nomeMateria: 'Machine Learning' },
        { nomeMateria: 'Redes Neurais' },
      ],
      'Desenvolvimento Web': [
        { nomeMateria: 'HTML e CSS Avançado' },
        { nomeMateria: 'JavaScript e Frameworks' },
        { nomeMateria: 'Banco de Dados para Web' },
      ],
      'Ciência de Dados': [
        { nomeMateria: 'Estatística Aplicada' },
        { nomeMateria: 'Big Data' },
        { nomeMateria: 'Visualização de Dados' },
      ]
    };

    const boletinsParaCriar = [];

    for (const userData of usersData) {
      const userInfo = createdUserIdsAndNames[userData.email];
      if (!userInfo || !userInfo.id) {
        console.log(`⚠️ Aluno com email ${userData.email} não encontrado para criar boletim.`);
        continue;
      }

      const materiasDoCursoDefinido = estruturaCursos[userData.curso];

      if (materiasDoCursoDefinido) {
        boletinsParaCriar.push({
          aluno: userInfo.id,         // O ObjectId do aluno
          nomeAluno: userInfo.nome,   // O nome do aluno, pego do 
          curso: userData.curso,
          semestre: userData.semestre,
          materias: materiasDoCursoDefinido.map(materia => ({
            nomeMateria: materia.nomeMateria,
            nota: Math.random() < 0.1 ? null : parseFloat((Math.random() * 5 + 5).toFixed(1)),
          })),
        });
      } else {
        console.log(`⚠️ Matérias para o curso "${userData.curso}" (aluno ${userData.nome}) não definidas na estruturaCursos. Boletim não criado.`);
      }
    }

    if (boletinsParaCriar.length > 0) {
      await Boletim.insertMany(boletinsParaCriar);
      console.log(`✅ ${boletinsParaCriar.length} Boletins foram criados com sucesso!`);
    } else {
      console.log('⚠️ Nenhum boletim foi criado (verifique a definição dos cursos e matérias).');
    }
    console.log('--- Seed de Boletins Concluída ---');

  } catch (error) {
    console.error('❌ Erro durante a execução da seed:', error);
  } finally {
    // É uma boa prática fechar a conexão após a seed.
    console.log('\n--- Processo de Seed Finalizado ---');
  }
}

seed();
