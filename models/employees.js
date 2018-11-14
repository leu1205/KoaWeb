const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/employees", { useNewUrlParser: true });

var Elyschema = new mongoose.Schema({
    employee_id: String,
    name: String,
    gender: String,
    title: String,
    updated_at: Date
});

module.exports = mongoose.model('Employee', Elyschema);