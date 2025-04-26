const express = require("express");//iniciando express
const path = require("path");//adicionando path
const app = express();//express
const bodyParser = require("body-parser");//fazendo a conexão  com a pasta public
const connection = require("./database/database");//conexão com banco de dados

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//database
connection.authenticate()
.then(()=>{
    console.log("conexao feita com sucesso");
}).catch((error)=>{
    console.log(error);
})

app.get("/", (req, res) => {
    res.render("index"); 
});

app.listen(8080, function (erro) {
    if (erro) {
        console.log("Ocorreu um erro");
    } else {
        console.log("Servidor rodando");
    }
});
