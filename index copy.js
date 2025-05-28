const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require('./database/database'); // AJUSTADO AQUI
const seed = require('./database/seed');



// Importação dos controllers e rotas

const authRouter = require("./routes/authRoutes");
const boletimRouter = require('./routes/authRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rotas
app.use("/auth", authRouter);
app.use('/api/boletim', boletimRouter);

connectDB();

app.listen(8080, () => {
  console.log("Servidor rodando em: http://localhost:8080");
});






// server.js ou app.js
const relatoriosRoutes = require('./src/routes/authRoures'); // Ajuste o caminho

const PORT = process.env.PORT || 3000;

app.use(cors()); // Habilita o CORS para que seu frontend possa fazer requisições
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições

// Use as rotas de relatório
app.use('/api', relatoriosRoutes); // Prefixo '/api' para suas rotas de API

app.get('/', (req, res) => {
    res.send('Servidor de relatórios está online!');
});

