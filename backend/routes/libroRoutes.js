const express = require("express");
const router = express.Router();
const uploadCloud = require("../config/cloudinary");
const Libro = require("../models/Libro");

// ==========================================
// RUTA 1: Obtener todos los libros
// ==========================================
router.get("/", async (req, res) => {
  try {
    const libros = await Libro.find();
    res.json(libros);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==========================================
// RUTA 2: Obtener un libro por ID
// ==========================================
router.get("/:id", async (req, res) => {
  try {
    const libro = await Libro.findById(req.params.id);
    if (!libro) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }
    res.json(libro);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==========================================
// RUTA 3: Crear libro 
// ==========================================
router.post("/", uploadCloud.single("imagen"), async (req, res) => {
  try {
    const { titulo, autor, isbn, sinopsis, precio_fisico, precio_digital, stock } = req.body;

    // Validaciones numéricas
    const precioFisicoNum = parseFloat(precio_fisico) || 0;
    const precioDigitalNum = parseFloat(precio_digital) || 0;
    const stockNum = parseInt(stock) || 0;

    // Validación ISBN básica
    if (!isbn || isbn.trim() === '') {
        return res.status(400).json({ message: "El campo ISBN es obligatorio." });
    }

    const nuevoLibro = new Libro({
      titulo,
      autor,
      isbn,
      sinopsis,
      portada_url: req.file ? req.file.path : "https://via.placeholder.com/300",
      precio: {
        fisico: precioFisicoNum,
        digital: precioDigitalNum,
      },
      stock: stockNum,
    });

    const libroGuardado = await nuevoLibro.save();
    res.status(201).json(libroGuardado);

  } catch (error) {
    console.error("Error al crear libro:", error);

    if (error.code === 11000) {
      return res.status(400).json({ message: "Error: Ese ISBN ya existe en la base de datos." });
    }
    res.status(400).json({ message: "Error al crear el libro", error: error.message });
  }
});

// ==========================================
// RUTA 4: Actualizar un libro (PUT)
// ==========================================
router.put('/:id', uploadCloud.single('imagen'), async (req, res) => {
    
    // Logs para depuración
    console.log("➡️ INICIO PUT LIBRO. ID:", req.params.id);
    
    try {
        const { titulo, autor, isbn, sinopsis, precio_fisico, precio_digital, stock } = req.body;

        // 1. VALIDACIÓN ISBN
        if (!isbn || isbn.trim() === '') {
            return res.status(400).json({ message: "El campo ISBN es obligatorio." });
        }

        // 2. BUSCAR LIBRO ORIGINAL
        const libroOriginal = await Libro.findById(req.params.id);
        if (!libroOriginal) {
            return res.status(404).json({ message: "Libro no encontrado" });
        }

        // 3. PREPARAR DATOS
        const pFisico = parseFloat(precio_fisico);
        const pDigital = parseFloat(precio_digital);
        const stockNum = parseInt(stock);

        const datosAActualizar = {
            titulo,
            autor,
            isbn,
            sinopsis,
            precio: {
                fisico: isNaN(pFisico) ? 0 : pFisico,
                digital: isNaN(pDigital) ? 0 : pDigital
            },
            stock: isNaN(stockNum) ? 0 : stockNum,
            // Si hay foto nueva usamos esa, si no, la vieja
            portada_url: req.file ? req.file.path : libroOriginal.portada_url
        };

        // 4. ACTUALIZAR
        const libroActualizado = await Libro.findByIdAndUpdate(
            req.params.id, 
            datosAActualizar, 
            { new: true, runValidators: true } 
        );

        console.log("✅ ¡ÉXITO! Libro actualizado.");
        res.json(libroActualizado);

    } catch (error) {
        console.error("Error backend:", error);

        // Error duplicado
        if (error.code === 11000) {
            return res.status(400).json({ message: "Error: Ese ISBN ya pertenece a otro libro." });
        }

        res.status(500).json({ 
            message: "Error interno del servidor", 
            error: error.message 
        });
    }
});

// ==========================================
// RUTA 5: Eliminar un libro
// ==========================================
router.delete("/:id", async (req, res) => {
  try {
    const libroEliminado = await Libro.findByIdAndDelete(req.params.id);

    if (!libroEliminado) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }
    res.json({ message: "Libro eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;