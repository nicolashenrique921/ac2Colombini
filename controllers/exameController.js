const express = require('express');
const Exame = require('../models/exame.js');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const exames = await Exame.find().populate('clienteId');
        res.json(exames);
    } catch (error) {
        res.status(404).json({ message: 'Erro ao obter os exames' });
    }
}),
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const exame = await Exame.findById(id).populate('clienteId');
         res.json(exame);
    } catch (error) {
        res.status(404).json({ message: 'Erro ao obter o exame' });
    }
}),
router.post('/', async (req, res) => {
    const { nome, clinica, clienteId } = req.body;
    const exame = {
        nome,
        clinica,
        clienteId
    }
    try {
        await Exame.create(exame);
        res.status(201).json(exame);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao criar exame', error });
    }
}),
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;
        const updatedExame = await Exame.findByIdAndUpdate(id, updateFields, { new: true });
        if (!updatedExame) {
            return res.status(422).json({ mensagem: "Exame não encontrado" });
        }
        res.status(200).json(updatedExame);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao atualizar exame", erro: error.message });
    }
}),
router.delete('/:id', async (req, res) => {
    try {
        const exame = await Exame.findByIdAndDelete(req.params.id);
        if (!exame) {
            return res.status(422).json({ mensagem: "Exame não encontrado" });
        }
        res.status(200).json({ mensagem: "Excluído com sucesso!" });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao excluir exame",
            erro: error.message
        });
    }
})

module.exports = router