import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";

function Navbar() {
  const { cantidadTotal } = useCarrito();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          📚 Librería DAW2
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {/* ENLACE CARRITO */}
            <li className="nav-item me-3">
              <Link className="nav-link" to="/carrito">
                🛒 Carrito{" "}
                <span className="badge bg-primary">{cantidadTotal}</span>
              </Link>
            </li>

            {/* MENÚ DE USUARIO */}
            <li className="nav-item dropdown">
              {/* CAMBIO 1: Texto del botón principal */}
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                👤 Iniciar sesión
              </a>

              <ul className="dropdown-menu dropdown-menu-end">
                {/* CAMBIO 2: Texto exacto de la primera opción */}
                <li>
                  <Link className="dropdown-item" to="/login">
                    Iniciar sesión
                  </Link>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                {/* CAMBIO 3: Texto exacto de la segunda opción */}
                {/* Opción 2: Registrarse (CONECTADA) */}
                <li>
                  <Link className="dropdown-item" to="/registro">
                    Registrarse
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
