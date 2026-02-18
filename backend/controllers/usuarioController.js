const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

// ==========================================
// REGISTRAR USUARIO
// ==========================================
const registrarUsuario = async (req, res) => {
  const { email, password, nombre } = req.body;

  try {
    // 1. Verificar si ya existe email
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({ mensaje: "Ese email ya está registrado ⛔" });
    }

    // 2. Comprobamos Nombre de Usuario (Nick)
    const existeNick = await Usuario.findOne({ nombre });
    if (existeNick) {
      return res.status(400).json({ mensaje: "Ese nombre de usuario ya está ocupado ⛔" });
    }

    // 3. Crear usuario
    const usuario = new Usuario(req.body);

    // 4. Encriptar password
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);

    // 5. Asignar rol por defecto si no viene (opcional pero recomendado)
    if (!usuario.rol) {
        usuario.rol = 'usuario';
    }

    // 6. Guardar
    await usuario.save();

    res.json({ mensaje: "¡Usuario creado correctamente! ✅" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Hubo un error en el servidor" });
  }
};

// ==========================================
// LOGIN USUARIO (Aquí estaba el fallo)
// ==========================================
const loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Buscar si el usuario existe por email
        const usuario = await Usuario.findOne({ email });
        
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        // 2. Verificar la contraseña
        const esCorrecto = await bcrypt.compare(password, usuario.password);

        if (!esCorrecto) {
            return res.status(401).json({ mensaje: "Contraseña incorrecta" });
        }

        // 3. GENERAR EL TOKEN (¡ESTO ES LO QUE FALTABA!) 🔑
        // Creamos la "llave" con el ID y el ROL del usuario
        const token = jwt.sign(
            { 
                id: usuario._id, 
                rol: usuario.rol 
            }, 
            process.env.JWT_SECRET, // Usamos la palabra secreta de Railway
            { expiresIn: '1d' }     // Caduca en 1 día
        );

        // 4. Devolvemos el Token y los datos del usuario
        res.json({
            token, // <--- Importante: enviamos el token al frontend
            usuario: {
                _id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

module.exports = {
    registrarUsuario,
    loginUsuario
};