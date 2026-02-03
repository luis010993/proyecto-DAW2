require('dotenv').config();
const mongoose = require('mongoose');
const Libro = require('./models/Libro');

// Conexión rápida a la BD
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('🔌 Conectado a MongoDB para sembrar datos...'))
    .catch(err => console.log(err));

const librosDePrueba = [
    {
        titulo: "Don Quijote de la Mancha",
        autor: "Miguel de Cervantes",
        isbn: "978-8424117909",
        sinopsis: "El ingenioso hidalgo don Quijote de la Mancha narra las aventuras de Alonso Quijano...",
        genero: "Clásicos",
        precio: { fisico: 15.50, digital: 0 },
        stock: 10,
        // CAMBIO AQUÍ: Ruta local
        portada_url: "/img/quijote.jpg"
    },
    {
        titulo: "Clean Code",
        autor: "Robert C. Martin",
        isbn: "978-0132350884",
        sinopsis: "Reglas y recomendaciones para escribir código limpio y mantenible.",
        genero: "Programación",
        precio: { fisico: 35.00, digital: 12.99 },
        stock: 5,
        // CAMBIO AQUÍ: Ruta local
        portada_url: "/img/cleancode.jpg",
        contenido_gratuito: {
            disponible: true,
            enlace_descarga: "https://gutendex.com/books/clean-code-sample.pdf"
        }
    }
];

const importarDatos = async () => {
    try {
        // 1. Borramos todo lo que haya antes para no duplicar
        await Libro.deleteMany();
        console.log('🧹 Base de datos limpiada.');

        // 2. Insertamos los libros
        await Libro.insertMany(librosDePrueba);
        console.log('✅ Libros importados correctamente.');
        
        // 3. Cerramos la conexión
        process.exit();
    } catch (error) {
        console.error('❌ Error importando datos:', error);
        process.exit(1);
    }
};

importarDatos();