const express = require("express");
const app = express();

app.set('view engine', 'ejs');

app.get("/", (req,res)=>{
    res.send("Bem vindo ao meu site");
})

app.listen(3000,function(erro){
    if(erro){
        console.log("Ocorreu um erro");
    }else{
        console.log("Iniciando servidor");
    }
})