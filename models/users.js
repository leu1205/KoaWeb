const mongoose = require('mongoose');

var Userschema = new mongoose.Schema({
    name: String,
    password: String
});

var users = mongoose.model('user', Userschema);

module.exports = users;