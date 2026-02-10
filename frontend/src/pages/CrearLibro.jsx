import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CrearLibro() {
  const navigate = useNavigate();
  
  // Estado inicial del formulario
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    sinopsis: '',
    precio_fisico: '',
    precio_digital: '',
    portada_url: '',
    stock: 10
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
      
      // Preparamos el objeto para que coincida con tu Modelo de Mongoose
      // Aseguramos que los precios sean números
      const libroAEnviar = {
        titulo: formData.titulo,
        autor: formData.autor,
        sinopsis: formData.sinopsis,
        portada_url: formData.portada_url,
        precio: {
            fisico: parseFloat(formData.precio_fisico),
            digital: parseFloat(formData.precio_digital)
        },
        stock: parseInt(formData.stock)
      };

      // Recogemos el token (Asumo que lo guardaste en localStorage al hacer login)
      // Si no usas localStorage, quita el header 'Authorization'
      const token = localStorage.getItem('token'); 

      await axios.post(`${URL}/api/libros`, libroAEnviar, {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });

      alert('¡Libro creado con éxito!');
      navigate('/'); // Volvemos al inicio para verlo

    } catch (error) {
      console.error(error);
      alert('Error al crear el libro');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: '600px' }}>
        <h2 className="text-center mb-4">📚 Añadir Nuevo Libro</h2>
        
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label className="form-label">Título</label>
            <input type="text" name="titulo" className="form-control" required onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Autor</label>
            <input type="text" name="autor" className="form-control" required onChange={handleChange} />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Precio Físico (€)</label>
              <input type="number" step="0.01" name="precio_fisico" className="form-control" required onChange={handleChange} />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Precio Digital (€)</label>
              <input type="number" step="0.01" name="precio_digital" className="form-control" required onChange={handleChange} />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">URL de la Portada (Imagen)</label>
            <input type="url" name="portada_url" className="form-control" placeholder="https://..." onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Sinopsis</label>
            <textarea name="sinopsis" className="form-control" rows="3" onChange={handleChange}></textarea>
          </div>

          <button type="submit" className="btn btn-success w-100 fw-bold">Guardar Libro</button>
          
        </form>
      </div>
    </div>
  );
}

export default CrearLibro;