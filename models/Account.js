const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const accountSchema = new mongoose.Schema({
  login: String,
  password: String
}).plugin(passportLocalMongoose) // On plug les méthode de passportLocalMongoose

module.exports = mongoose.model('Account', accountSchema)
