const express = require('express');
const router = express.Router();
const Libro = require('../models/Libro');

// RUTA 1: Obtener todos los libros
router.get('/', async (req, res) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- RUTA 2: ESTA ES LA QUE TE FALTA O FALLA ---
router.get('/:id', async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.id);
        if (!libro) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }
        res.json(libro);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// -----------------------------------------------

module.exports = router; // <--- ESTO DEBE IR AL FINAL DEL TODO