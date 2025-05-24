const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connection, User, Boletim } = require("./database/database"); // AJUSTADO AQUI

// Importação dos modelos (já estão importados junto com a conexão)
const Course = require("./courses/Course");

// Importação dos controllers e rotas
const courseController = require("./courses/CourseController");
const boletimController = require("./boletins/BoletimController");
const authRouter = require("./routes/authRoutes");

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
app.use("/api", boletimController);
app.use("/", courseController);

// Conexão e sincronização com o banco
connection.authenticate()
  .then(() => {
    console.log("Conectado ao banco de dados com sucesso!");

    return connection.sync({ alter: true });
  })
  .then(() => {
    console.log("Banco sincronizado com sucesso!");
    app.listen(8080, () => {
      console.log("Servidor rodando em: http://localhost:8080");
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco:", err);
  });
