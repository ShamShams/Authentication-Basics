const express = require('express');
const mongoose = require('mongoose');
const Account = require('./models/Account');
const passport = require('passport');
const userLocalStrategy = require('./middlewares/middleware');
const jsonwebtoken = require('jsonwebtoken');
const jwt = require('express-jwt');

const app = express();
// Le secret doit être dans un fichier chaché
const secret = 'sEcrEt';

mongoose.connect('mongodb://localhost:27017/authent');

passport.initialize();
userLocalStrategy() // définit comment on vérifie

// Création du compte
app.post('/', express.urlencoded({ extended: true }), (req, res) => {
  Account.register(new Account({ username: req.body.login }), req.body.password, (err, account) => {
    // register est une méthode de passport-local-mongoose, il va hasher req.body.password en hash+salt
    if (err) return res.send(err);
    res.send('User ' + account.login + ' a été créé');
  });
});

// Login
app.post('/login', express.urlencoded({ extended: true }), passport.authenticate('local', { session: false }), (req, res) => {
  // On génère un token
  jsonwebtoken.sign({ username: req.body.login }, secret, { expiresIn: 60 }, (err, token) => {
    res.send('Votre token : ' + token);
  })
}) // passport.authenticate vérifie le login et password (voir middleware)

app.get('/info', jwt({ secret: secret }), (req, res) => {
  res.send('Autorisé');
})

app.get('/accounts', jwt({ secret: secret }), (req, res) => {
  Account.find((err, accounts) => {
    if (err) return res.send(err);
    res.send(accounts);
  })
})

app.listen(8080, () => {
  console.log('Server listening on port 8080...');
});
