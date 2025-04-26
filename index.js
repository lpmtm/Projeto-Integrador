const express = require("express"); // iniciando express
const path = require("path"); // adicionando path
const bodyParser = require("body-parser"); // fazendo a conexão com a pasta public
const connection = require("./database/database"); // conexão com banco de dados
const Controller = require("./login/Controller"); // importando o controller

const app = express(); // instanciando express

app.set('view engine', 'ejs'); // configurando o view engine
app.set('views', path.join(__dirname, 'views')); // configurando a pasta views

app.use(express.static('public')); // servindo arquivos estáticos

// Usando bodyParser para processar dados do formulário
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Conexão com o banco de dados
connection.authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados feita com sucesso");
    })
    .catch((error) => {
        console.log("Erro ao conectar ao banco de dados:", error);
    });

// Usando o Controller para as rotas
app.use("/", Controller); // Usando as rotas definidas no Controller

// Rota para renderizar a página inicial
app.get("/", (req, res) => {
    res.render("index");
});

// Conexão com o servidor
app.listen(8080, () => {
    console.log("Servidor rodando");
});
