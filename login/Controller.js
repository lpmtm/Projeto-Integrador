const express = require('express');
const router = express.Router();

// Exemplo de rota no controller
router.get('/login', (req, res) => {
    res.render('login'); // ou qualquer outra lógica de renderização
});

module.exports = router; // Certifique-se de exportar o router
