const mongoose = require('mongoose');
require('dotenv').config(); // se estiver usando .env

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('🟢 Conectado ao MongoDB com sucesso!');
  } catch (err) {
    console.error('🔴 Erro ao conectar ao MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;