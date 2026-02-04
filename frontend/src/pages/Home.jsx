import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// Importamos el nuevo bloque de estructura
import Filtros from '../components/Filtros';

function Home() {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/libros')
      .then(res => setLibros(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container-fluid p-4">
      
      {/* 1. INSERCIÓN: La barra de filtros debajo del menú principal */}
      <Filtros />

      <hr /> {/* Una línea separadora para organizar visualmente */}

      {/* 2. CAMBIO: Título exacto del Figma */}
      <h2 className="text-center mb-4">Libros</h2>
      
      {/* 3. GRID: Estructura de 4 columnas (Ya la teníamos bien configurada) */}
      <div className="row">
        {libros.map((libro) => (
          <div key={libro._id} className="col-12 col-md-6 col-lg-3 mb-4">
            <div className="card h-100 shadow-sm">
              <img 
                src={libro.portada_url || "https://via.placeholder.com/300"} 
                className="card-img-top" 
                alt={libro.titulo} 
                style={{ height: '350px', objectFit: 'cover' }} 
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{libro.titulo}</h5>
                <p className="card-text text-muted">{libro.autor}</p>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <span className="h5 text-primary mb-0">{libro.precio?.fisico} €</span>
                  <Link to={`/libro/${libro._id}`} className="btn btn-dark">
                    Ver Detalles
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;