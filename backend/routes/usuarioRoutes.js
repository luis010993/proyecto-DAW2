const express = require('express');
const router = express.Router();

// Importamos AMBAS funciones (ahora loginUsuario ya existe)
const { registrarUsuario, loginUsuario } = require('../controllers/usuarioController');

// Ruta POST para registrar usuarios
router.post('/', registrarUsuario);

// [NUEVO] Ruta POST para iniciar sesión
// Esto hace que funcione http://localhost:4000/api/usuarios/login
router.post('/login', loginUsuario); 

module.exports = router;