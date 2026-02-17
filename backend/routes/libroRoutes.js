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
        // La magia de Cloudinary:
        // Si el archivo se subió bien, la URL estará en req.file.path
        const { titulo, autor, sinopsis, precio_fisico, precio_digital, stock } = req.body;

        const nuevoLibro = new Libro({
            titulo,
            autor,
            sinopsis,
            // Guardamos la URL que nos da Cloudinary
            portada_url: req.file ? req.file.path : 'https://via.placeholder.com/300', 
            precio: {
                fisico: parseFloat(precio_fisico),
                digital: parseFloat(precio_digital)
            },
            stock: parseInt(stock)
        });

        const libroGuardado = await nuevoLibro.save();
        res.status(201).json(libroGuardado);
        
    } catch (error) {
        console.error("Error al crear libro:", error);
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
module.exports = router;