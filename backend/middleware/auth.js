const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    // 1. Buscamos el token en la cabecera
    const token = req.header('Authorization');

    // 2. Si no hay token, fuera
    if (!token) {
        return res.status(401).json({ message: "Acceso denegado. No hay token." });
    }

    try {
        // 3. Limpiamos el string "Bearer " si viene incluido
        const tokenLimpio = token.replace("Bearer ", "");

        // 4. Verificamos la firma con tu palabra secreta
        const verificado = jwt.verify(tokenLimpio, process.env.JWT_SECRET);

        // 5. ¡ÉXITO! Guardamos los datos del usuario dentro de la petición (req)
        // Así las rutas podrán saber quién es.
        req.usuario = verificado; 
        
        next(); // Dejamos pasar a la siguiente función (la ruta)

    } catch (error) {
        res.status(400).json({ message: "Token no válido o expirado." });
    }
};

module.exports = verificarToken;