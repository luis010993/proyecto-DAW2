const express = require('express');
const router = express.Router();
// Importamos el Modelo para las consultas directas de Admin
const Usuario = require('../models/Usuario'); 

// Importamos las funciones del controlador para Auth
const { registrarUsuario, loginUsuario } = require('../controllers/usuarioController');

// ==========================================
// 🔐 RUTAS PÚBLICAS (Auth)
// ==========================================

// 1. Registrar usuario (POST /api/usuarios)
router.post('/', registrarUsuario);

// 2. Iniciar sesión (POST /api/usuarios/login)
router.post('/login', loginUsuario);


// ==========================================
// ⚡ RUTAS DE ADMINISTRADOR (Gestión)
// ==========================================

// 3. Obtener TODOS los usuarios (GET /api/usuarios)
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find().select('-password');
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 4. Cambiar ROL de usuario (PUT /api/usuarios/:id)
router.put('/:id', async (req, res) => {
    try {
        const { rol } = req.body;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            req.params.id, 
            { rol: rol }, 
            { new: true }
        );
        res.json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar rol" });
    }
});

// 5. Eliminar usuario (DELETE /api/usuarios/:id)
router.delete('/:id', async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id);
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;