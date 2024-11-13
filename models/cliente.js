const mongoose = require('mongoose');

const Cliente = mongoose.model("Cliente", {
    nome: String,
    idade: Number,
    RA: String
})

module.exports = Cliente;