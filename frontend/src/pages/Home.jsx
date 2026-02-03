import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/libros')
      .then(res => setLibros(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">📚 Catálogo Completo</h1>
      <div className="row">
        {libros.map((libro) => (
          <div key={libro._id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img 
                src={libro.portada_url || "https://via.placeholder.com/300"} 
                className="card-img-top" 
                alt={libro.titulo} 
                style={{ height: '300px', objectFit: 'cover' }} 
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