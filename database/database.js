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

//module.exports = connectDB;



const { Pool } = require('pg');
require('dotenv').config(); // Carrega as variáveis de ambiente

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432, // Porta padrão do PostgreSQL
});


module.exports = {
    query: (text, params) => pool.query(text, params),
};

module.exports = connectDB;