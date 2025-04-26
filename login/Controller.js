const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email === 'admin@admin.com' && password === 'admin123') {
        res.redirect('/home');  
    } else {
        res.render('login', { error: 'Credenciais inválidas!' });  
    }
});

router.get('/home', (req, res) => {
    res.render('index');  
});

module.exports = router;
