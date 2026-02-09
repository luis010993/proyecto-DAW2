import { Link, useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext"; // <--- IMPORTACIÓN ACTIVADA
import logo from "../images/logo.jpg"; // Asegúrate de que la ruta sea correcta

function Navbar() {
  const { cantidadTotal } = useCarrito();
  const navigate = useNavigate();

  // --- CONEXIÓN REAL AL CONTEXTO ---
  // Extraemos el usuario real y la función para salir
  const { usuario, logout } = useAuth(); 

  const handleCerrarSesion = () => {
    logout(); // Limpia el estado y el localStorage
    navigate("/"); // Redirige al inicio
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo QuéDeLibros" height="40" className="d-inline-block align-text-top rounded" />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            
            {/* CARRITO (Siempre visible) */}
            <li className="nav-item me-3">
              <Link className="nav-link" to="/carrito">
                🛒 Carrito <span className="badge bg-primary">{cantidadTotal}</span>
              </Link>
            </li>

            {/* --- LÓGICA: ¿HAY USUARIO REAL? --- */}
            {usuario ? (
              // === OPCIÓN A: USUARIO LOGUEADO ===
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                  {/* Muestra el nombre real de la base de datos */}
                  👋 Benvingut, {usuario.nombre}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  {/* Bloque Personal */}
                  <li><Link className="dropdown-item" to="/perfil">Editar perfil</Link></li>
                  <li><Link className="dropdown-item" to="/favoritos">Favoritos</Link></li>
                  
                  <li><hr className="dropdown-divider" /></li>
                  
                  {/* Bloque Historial */}
                  <li><h6 className="dropdown-header">Historial</h6></li>
                  <li><Link className="dropdown-item" to="/historial/compras"> 📦 Compras</Link></li>
                  <li><Link className="dropdown-item" to="/historial/descargas"> ⬇️ Descargas</Link></li>

                  <li><hr className="dropdown-divider" /></li>

                  {/* Cerrar Sesión */}
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleCerrarSesion}>
                      Tanca la sessio
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              // === OPCIÓN B: INVITADO (NO LOGUEADO) ===
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                  👤 Iniciar sesión
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to="/login">Iniciar sesión</Link></li>
                  <li><Link className="dropdown-item" to="/registro">Registrarse</Link></li>
                </ul>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;