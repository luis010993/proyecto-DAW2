function Filtros() {
  return (
    <div className="container-fluid mb-4">
      {/* Usamos d-flex para ponerlos en fila horizontal */}
      <div className="d-flex flex-wrap align-items-center gap-2">
        
        {/* Etiqueta Explorar */}
        <h5 className="mb-0 me-3">Explorar</h5>

        {/* Botones de estructura (usamos btn-outline-dark para que se vean simples) */}
        <button className="btn btn-outline-dark">Categorías</button>
        <button className="btn btn-outline-dark">Autores</button>
        <button className="btn btn-outline-dark">Editoriales</button>
        <button className="btn btn-outline-dark">Recomendados</button>
      </div>
    </div>
  );
}

export default Filtros;