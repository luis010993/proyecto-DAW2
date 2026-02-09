import { createContext, useContext, useState, useEffect } from "react";

// 1. Creamos el contexto
const AuthContext = createContext();

// 2. Creamos el proveedor (el componente que envolverá tu App)
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Al cargar la app, comprobamos si ya había una sesión guardada
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario_quedelibros");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
    setCargando(false);
  }, []);

  // Función para INICIAR SESIÓN (La llamarás desde Login.js)
  const login = (datosUsuario) => {
    // Guardamos en el estado (para que la web reaccione rápido)
    setUsuario(datosUsuario);
    // Guardamos en el navegador (para que no se borre al recargar)
    localStorage.setItem("usuario_quedelibros", JSON.stringify(datosUsuario));
  };

  // Función para CERRAR SESIÓN (La llamarás desde el Navbar)
  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario_quedelibros");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, cargando }}>
      {!cargando && children}
    </AuthContext.Provider>
  );
}

// 3. Hook personalizado para usarlo fácil en cualquier componente
export const useAuth = () => useContext(AuthContext);
