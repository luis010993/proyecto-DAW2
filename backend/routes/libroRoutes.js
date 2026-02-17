const express = require('express');
const router = express.Router();
const uploadCloud = require('../config/cloudinary'); 
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

// RUTA 2: Obtener un libro por ID
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

// RUTA 3: Crear libro (Aquí he metido la lógica del controlador que te faltaba)
router.post('/', uploadCloud.single('imagen'), async (req, res) => {
    try {
        // 1. AÑADIMOS 'isbn' A LA LISTA DE COSAS QUE RECIBIMOS
        const { titulo, autor, isbn, sinopsis, precio_fisico, precio_digital, stock } = req.body;

        // Validaciones numéricas (esto ya lo tenías)
        const precioFisicoNum = parseFloat(precio_fisico) || 0;
        const precioDigitalNum = parseFloat(precio_digital) || 0;
        const stockNum = parseInt(stock) || 0;

        // 2. CREAMOS EL LIBRO CON EL ISBN
        const nuevoLibro = new Libro({
            titulo,
            autor,
            isbn, // <--- ¡IMPORTANTE! Añadir esto aquí
            sinopsis,
            portada_url: req.file ? req.file.path : 'https://via.placeholder.com/300', 
            precio: {
                fisico: precioFisicoNum,
                digital: precioDigitalNum
            },
            stock: stockNum
        });

        const libroGuardado = await nuevoLibro.save();
        res.status(201).json(libroGuardado);
        
    } catch (error) {
        console.error("Error al crear libro:", error);
        
        // --- TRUCO PRO: Detectar si es error de ISBN duplicado ---
        if (error.code === 11000) {
            return res.status(400).json({ message: "Error: Ese ISBN ya existe en la base de datos." });
        }
        
        res.status(400).json({ message: "Error al crear el libro", error: error.message });
    }
});
// --- RUTA 4: Actualizar el rol de un usuario ---
router.put('/:id', async (req, res) => {
    try {
        const { rol } = req.body; // Recibimos el nuevo rol (ej: "admin")
        
        // Buscamos al usuario por ID y actualizamos su campo 'rol'
        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            req.params.id, 
            { rol: rol }, 
            { new: true } // Esto hace que nos devuelva el usuario ya cambiado
        );
        
        res.json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar rol" });
    }
});
// RUTA 5: Eliminar un libro (DELETE /api/libros/:id)
router.delete('/:id', async (req, res) => {
    try {
        const libroEliminado = await Libro.findByIdAndDelete(req.params.id);
        
        if (!libroEliminado) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }
        
        // Opcional: Aquí podrías añadir código para borrar la foto de Cloudinary si quisieras ser muy limpio
        
        res.json({ message: 'Libro eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;