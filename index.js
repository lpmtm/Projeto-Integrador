

const express = require("express"); // iniciando express
const path = require("path"); // adicionando path
const bodyParser = require("body-parser"); // fazendo a conexão com a pasta public
const connection = require("./database/database"); // conexão com banco de dados
const courseController = require("./courses/CourseController");
const boletimController = require("./boletins/BoletimController");
const Boletim = require("./boletins/Boletim");
const Course = require("./courses/Course");
const app = express();
const authRouter = require("./routes/authRoutes")

const cors = require('cors');
app.use(cors());



app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views')); 

app.use(express.json());
app.use(express.static('public')); 
app.use("/auth", authRouter);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/",courseController);
app.use("/", boletimController);


connection.authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados feita com sucesso");
    })
    .catch((error) => {
        console.log("Erro ao conectar ao banco de dados:", error);
    });

app.listen(8080, () => console.log("Servidor rodando na porta 8080"));
