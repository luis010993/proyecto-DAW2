import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// 1. IMPORTANTE: Los estilos (ya lo tenías)
import 'bootstrap/dist/css/bootstrap.min.css'
// 2. [NUEVO] IMPORTANTE: La interactividad (para que funcionen los menús)
import 'bootstrap/dist/js/bootstrap.bundle.min.js' 

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)