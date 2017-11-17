const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// ES6: import { Strategy as LocalStrategy } from 'passport-local';
const Account = require('../models/Account');

const userLocalStrategy = () => {
  passport.use(new LocalStrategy({
  // vérifie les credentials:
    usernameField: 'login',
    passwordField: 'password'
  },
    Account.authenticate()
  ))
};

module.exports = userLocalStrategy;

// console.log(Account.authenticate().toString());
