import { Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';

function Navbar() {
  const { cantidadTotal } = useCarrito();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      {/* Usamos container-fluid para ancho total */}
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
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Catálogo</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/carrito">
                🛒 Carrito <span className="badge bg-primary">{cantidadTotal}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;