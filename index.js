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
