const express = require("express");
const router = express.Router();

router.get("/courses",(req,res)=>{
    res.send("Rota de Cursos")
});

router.get("/admin/courses/new",(req,res)=>{
    res.send("Rota para criar um curso")
})

module.exports = router;