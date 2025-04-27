const express = require("express");
const router = express.Router();

router.get("/boletins",(req,res)=>{
    res.send("Rota de boletim")
});

router.get("/admin/boletins/new",(req,res)=>{
    res.send("Rota para criar um boletim")
})

module.exports = router;