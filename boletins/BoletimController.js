const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");


const User = require("../models/User");
const boletim = require("../boletins/Boletim");

router.get("/boletim", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        const boletins = await user.getBoletins();

        // Corrigido o nome da propriedade: `materia.nome` → `materia.materia`
        const materiasFormatadas = boletins.map(materia => ({
            materia: materia.materia, // pega o campo correto
            semestre: materia.semestre,
            nota: materia.nota
        }));

        res.json(materiasFormatadas);
    } catch (error) {
        console.error("Erro ao buscar boletim:", error);
        res.status(500).json({ message: "Erro ao buscar boletim" });
    }
});

module.exports = router;

