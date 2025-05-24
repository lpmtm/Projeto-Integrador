const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');
const boletimController = require("../boletins/BoletimController");

// Rota de login
router.post('/login', authController.login);

// Rota protegida
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Acesso permitido', user: req.user });
});


module.exports = router;