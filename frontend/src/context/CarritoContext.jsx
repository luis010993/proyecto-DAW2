import { createContext, useState, useContext } from 'react';

// 1. Creamos el contexto (la nube donde vivirán los datos)
const CarritoContext = createContext();

// 2. Creamos un "Proveedor" (el componente que envuelve a toda la app)
export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Función para añadir libros
  const agregarAlCarrito = (libro) => {
    setCarrito((prevCarrito) => {
      // Miramos si el libro ya estaba para no duplicarlo, solo sumar cantidad
      const existe = prevCarrito.find((item) => item._id === libro._id);
      if (existe) {
        return prevCarrito.map((item) =>
          item._id === libro._id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      // Si es nuevo, lo añadimos con cantidad 1
      return [...prevCarrito, { ...libro, cantidad: 1 }];
    });
    alert("¡Libro añadido al carrito! 📚"); // Feedback simple
  };

  // Función para saber cuántos libros llevamos (para el numerito rojo)
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, cantidadTotal }}>
      {children}
    </CarritoContext.Provider>
  );
};

// 3. Un atajo (hook) para usar el carrito fácil en cualquier lado
export const useCarrito = () => useContext(CarritoContext);