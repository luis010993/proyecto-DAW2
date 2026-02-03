require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// [NUEVO] Importamos el archivo de rutas
const libroRoutes = require('./routes/libroRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a BD
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Base de datos MongoDB conectada correctamente'))
    .catch((error) => console.error('❌ Error conectando a MongoDB:', error));

// [NUEVO] Usamos las rutas
// Esto dice: "Todo lo que empiece por /api/libros, búscalo en libroRoutes"
app.use('/api/libros', libroRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});