const express = require('express');
const mongoose = require('mongoose');

const clienteController = require('./controllers/clienteController.js')
const exameController = require('./controllers/exameController.js')

const app = express();

app.use(express.json());

app.use('/cliente', clienteController)
app.use('/exame', exameController)

mongoose.connect("mongodb://127.0.0.1:27017/ac2")
.then(() => {
app.listen(3000, () => {
console.log('Conectado ao mongoDB');
console.log('Servidor iniciado na porta 3000');
})
})
.catch((err) => {
console.log(err);
});

