// updateUserData.js
const mongoose = require('mongoose');
const User = require('./models/User');
const Boletim = require('./models/Boletim'); // Importar o modelo Boletim
const connectDB = require('./database/database');

//------------- Função para atualizar Dados pelo email --------------

const userEmailToUpdate = 'eduardo@gmail.com';
//------------- Inserir os dados aqui ----------------------//
const newUserData = { 
    telefone: "(61)0000-0000",




};



// ------Galera ent sempre lembra de atualizar la no seed tb!--------





async function runUpdate() {
  if (!userEmailToUpdate || Object.keys(newUserData).length === 0) {
    console.error('ERRO: Email do usuário ou dados para atualização não foram fornecidos no script.');
    return;
  }

  try {
    await connectDB(); // Conecta ao MongoDB

    console.log(`Atualizando dados para o usuário com email: ${userEmailToUpdate}...`);
    const updatedUser = await User.findOneAndUpdate(
        { email: userEmailToUpdate },
        { $set: newUserData },
        { new: true, runValidators: true } // Retorna o documento atualizado, aplica validadores do schema
    ).select('-password'); // Não queremos a senha no objeto retornado

    if (!updatedUser) {
      console.log(`Usuário com email ${userEmailToUpdate} não encontrado para atualização.`);
      await mongoose.connection.close();
      return;
    }

    console.log('✅ Dados do Usuário atualizados na coleção "users":');
    console.log(`  ID: ${updatedUser._id}`);
    console.log(`  Nome: ${updatedUser.nome}`);
    console.log(`  Email: ${updatedUser.email}`);
    console.log(`  Curso: ${updatedUser.curso}`);
    console.log(`  Telefone: ${updatedUser.telefone}`);
    console.log(`  Matricula: ${updatedUser.matricula}`);
    console.log(`  Semestre: ${updatedUser.semestre}`);

    // Agora, vamos atualizar TODOS os boletins existentes deste usuário
    // para refletir o novo nome, curso e semestre do perfil do usuário.

    const boletimUpdates = {};
    let precisaAtualizarBoletins = false;

    if (newUserData.nome !== undefined) {
      boletimUpdates.nomeAluno = updatedUser.nome;
      precisaAtualizarBoletins = true;
    }
    if (newUserData.curso !== undefined) {
      boletimUpdates.curso = updatedUser.curso;
      precisaAtualizarBoletins = true;
    }
    if (newUserData.semestre !== undefined) {
      boletimUpdates.semestre = updatedUser.semestre;
      precisaAtualizarBoletins = true;
    }

      if (newUserData.matricula !== undefined) {
      boletimUpdates.matricula = updatedUser.matricula;
      precisaAtualizarBoletins = true;
    }

    if (newUserData.telefone !== undefined) {
      boletimUpdates.telefone = updatedUser.telefone;
      precisaAtualizarBoletins = true;
    }

    if (precisaAtualizarBoletins && Object.keys(boletimUpdates).length > 0) {
      console.log(`\nAtualizando campos em TODOS os boletins existentes do usuário ${updatedUser.nome} para:`, boletimUpdates);
      
      const updateResult = await Boletim.updateMany(
        { aluno: updatedUser._id }, // Critério: todos os boletins deste aluno
        { $set: boletimUpdates }     // Novos valores para os campos especificados
      );

      if (updateResult.acknowledged) {
        console.log(`✅ ${updateResult.modifiedCount} boletim(ns) foram atualizados para o usuário ${updatedUser.nome}.`);
        if (updateResult.matchedCount === 0) {
            console.log(`(Nenhum boletim encontrado para o usuário ${updatedUser.nome} para atualizar.)`);
        }
      } else {
        console.warn('⚠️ A atualização dos boletins pode não ter sido concluída com sucesso (acknowledged: false).');
      }
    } else {
      console.log('\nNenhum campo relevante (nome, curso, semestre) foi alterado no perfil do usuário para justificar atualização em massa dos boletins, ou nenhum dado de atualização foi fornecido para os boletins.');
    }

  } catch (error) {
    console.error('❌ Erro durante o script de atualização:', error);
    if (error.name === 'ValidationError') { 
        console.error('Detalhes da Validação:', error.errors);
    }
  } finally {
   
    if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
        await mongoose.connection.close();
        console.log('\nConexão com o MongoDB fechada. Script finalizado.');
    } else {
        console.log('\nScript finalizado (conexão já estava fechada ou não foi aberta).');
    }
  }
}

runUpdate();