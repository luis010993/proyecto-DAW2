import { createContext, useContext, useState, useEffect } from "react";

// 1. Creamos el contexto
const AuthContext = createContext();

// 2. Creamos el proveedor
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Al cargar la app
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario_quedelibros");
    const tokenGuardado = localStorage.getItem("token_quedelibros");

    if (usuarioGuardado && tokenGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
    setCargando(false);
  }, []);

  // Función para INICIAR SESIÓN (CORREGIDA)
  const login = (datosRespuesta) => {
    // datosRespuesta viene del backend: { token: "...", usuario: { nombre: "...", rol: "..." } }
    
    const { token, usuario: datosUsuario } = datosRespuesta;

    // 1. Guardamos el USUARIO LIMPIO en el estado
    setUsuario(datosUsuario);

    // 2. Guardamos en localStorage por separado para mayor orden
    localStorage.setItem("usuario_quedelibros", JSON.stringify(datosUsuario));
    localStorage.setItem("token", token); // El nombre 'token' es estándar
  };

  // Función para CERRAR SESIÓN
  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario_quedelibros");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, cargando }}>
      {!cargando && children}
    </AuthContext.Provider>
  );
}

// 3. Hook personalizado
export const useAuth = () => useContext(AuthContext);