import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar'; 
import Home from './pages/Home';
import DetalleLibro from './pages/DetalleLibro';
import CarritoPage from './pages/CarritoPage';
import LoginPage from './pages/LoginPage'; // [NUEVO IMPORT]
import { CarritoProvider } from './context/CarritoContext';
import RegisterPage from './pages/RegisterPage'; // [NUEVO]

function App() {
  return (
    <BrowserRouter>
      <CarritoProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/libro/:id" element={<DetalleLibro />} />
          <Route path="/carrito" element={<CarritoPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* [NUEVA RUTA] */}
          <Route path="/registro" element={<RegisterPage />} />
          
        </Routes>
      </CarritoProvider>
    </BrowserRouter>
  );
}
export default App;