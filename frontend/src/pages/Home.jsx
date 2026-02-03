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
    // 'container-fluid' hace que ocupe todo el ancho
    // 'p-4' añade un poco de relleno para que no se pegue a los bordes
    <div className="container-fluid p-4">
      <h1 className="text-center mb-4">📚 Catálogo Completo</h1>
      
      <div className="row">
        {libros.map((libro) => (
          // AQUI ESTA EL CAMBIO IMPORTANTE DE TAMAÑO:
          // col-12: Móvil (Ocupa todo)
          // col-md-6: Tablet (Mitad de pantalla)
          // col-lg-3: PC (Un cuarto de pantalla, caben 4 libros)
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