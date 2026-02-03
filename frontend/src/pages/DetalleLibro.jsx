import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
// [NUEVO] Importamos el carrito
import { useCarrito } from '../context/CarritoContext';

function DetalleLibro() {
  const { id } = useParams();
  const [libro, setLibro] = useState(null);
  
  // [NUEVO] Sacamos la función de añadir del contexto
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    axios.get(`http://localhost:4000/api/libros/${id}`)
      .then(res => setLibro(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!libro) return <div className="text-center mt-5">Cargando libro...</div>;

  return (
    <div className="container mt-5">
      <Link to="/" className="btn btn-outline-secondary mb-3">← Volver al catálogo</Link>
      
      <div className="row">
        <div className="col-md-4">
          <img src={libro.portada_url} alt={libro.titulo} className="img-fluid rounded shadow" />
        </div>
        <div className="col-md-8">
          <h1>{libro.titulo}</h1>
          <h3 className="text-muted">{libro.autor}</h3>
          <hr />
          <p className="lead">{libro.sinopsis}</p>
          
          <div className="card bg-light p-3 mt-4">
            <h5>Opciones de Compra:</h5>
            <div className="d-flex gap-3 mt-2">
              {/* [NUEVO] Botones conectados al carrito */}
              <button 
                className="btn btn-primary"
                onClick={() => agregarAlCarrito(libro)}
              >
                Comprar Físico ({libro.precio?.fisico} €)
              </button>
              
              <button 
                className="btn btn-info text-white"
                onClick={() => agregarAlCarrito(libro)}
              >
                Comprar Ebook ({libro.precio?.digital} €)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleLibro;