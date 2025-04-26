const express = require("express"); // iniciando express
const path = require("path"); // adicionando path
const bodyParser = require("body-parser"); // fazendo a conexão com a pasta public
const connection = require("./database/database"); // conexão com banco de dados
const Controller = require("./login/Controller"); // importando o controller
const app = express();

app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views')); 

app.use(express.static('public')); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connection.authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados feita com sucesso");
    })
    .catch((error) => {
        console.log("Erro ao conectar ao banco de dados:", error);
    });


app.use("/", Controller); 

app.listen(8080, () => {
    console.log("Servidor rodando");
});
