const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extendes: false}));
app.use(bodyParser.json());

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
