const express = require('express');
const Cliente = require('../models/cliente.js');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (error) {
        res.status(404).json({ message: 'Erro ao obter os clientes' });
    }
}),
router.get('/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        res.json(cliente);
    } catch (error) {
        res.status(404).json({ message: 'Erro ao obter o cliente' });
    }
}),
router.post('/', async (req, res) => {
    const { nome, idade, RA } = req.body;
    const cliente = {
        nome,
        idade,
        RA
    }
    try {
        await Cliente.create(cliente);
        res.status(201).json(cliente);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao criar cliente', error });
    }
}),
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;
        const updatedCliente = await Cliente.findByIdAndUpdate(id, updateFields, { new: true });
        if (!updatedCliente) {
            return res.status(422).json({ mensagem: "Cliente não encontrado" });
        }
        res.status(200).json(updatedCliente);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao atualizar cliente", erro: error.message });
    }
}),
router.delete('/:id', async (req, res) => {
    try {
        const cliente = await Cliente.findByIdAndDelete(req.params.id);
        if (!cliente) {
            return res.status(422).json({ mensagem: "Cliente não encontrado" });
        }
        res.status(200).json({ mensagem: "Excluído com sucesso!" });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao excluir cliente",
            erro: error.message
        });
    }
})

module.exports = router