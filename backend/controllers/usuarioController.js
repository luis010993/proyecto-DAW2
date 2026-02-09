const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");

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

    // 3. Crear usuario (¡IMPORTANTE: añadí 'const')
    const usuario = new Usuario(req.body);

    // 4. Encriptar password
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);

    // 5. Guardar
    await usuario.save();

    res.json({ mensaje: "¡Usuario creado correctamente! ✅" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: "Hubo un error en el servidor" });
  }
};

const loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Buscar si el usuario existe por email
        const usuario = await Usuario.findOne({ email });
        
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        // 2. Verificar la contraseña (CORREGIDO)
        // Usamos bcrypt.compare para comparar el texto plano con el hash de la BD
        const esCorrecto = await bcrypt.compare(password, usuario.password);

        if (!esCorrecto) {
            return res.status(401).json({ mensaje: "Contraseña incorrecta" });
        }

        // 3. Si todo está bien, devolvemos los datos
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol
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