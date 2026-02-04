const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");

const registrarUsuario = async (req, res) => {
  const { email, password, nombre } = req.body;

  try {
    // Verificar si ya existe
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({ msg: "Ese email ya está registrado ⛔" });
    }

    // 2. [NUEVO] Comprobamos Nombre de Usuario (Nick)
    const existeNick = await Usuario.findOne({ nombre });
    if (existeNick) {
      return res
        .status(400)
        .json({ msg: "Ese nombre de usuario ya está ocupado ⛔" });
    }

    // Crear usuario
    usuario = new Usuario(req.body);

    // Encriptar password
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);

    // Guardar
    await usuario.save();

    res.json({ msg: "¡Usuario creado correctamente! ✅" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error en el servidor" });
  }
};

module.exports = {
  registrarUsuario,
};
