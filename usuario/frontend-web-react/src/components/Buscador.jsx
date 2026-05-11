import { useState, useEffect, useRef } from "react";
import "../styles/Buscador.css";

// El buscador muestra sugerencias mientras escribes
// Usa "debounce" — espera 300ms después de que dejas de escribir para buscar
// Así no hace una petición por cada tecla
function Buscador({ onSeleccionar }) {
  const [query, setQuery]           = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [cargando, setCargando]     = useState(false);
  const [mostrar, setMostrar]       = useState(false);
  const timerRef                    = useRef(null);

  useEffect(() => {
    if (query.trim().length < 2) {
      setSugerencias([]);
      setMostrar(false);
      return;
    }

    // Cancelamos el timer anterior — esto es el debounce
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setCargando(true);
      fetch(`http://localhost:8081/busqueda?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => {
          setSugerencias(data.slice(0, 6)); // máximo 6 sugerencias
          setMostrar(true);
          setCargando(false);
        })
        .catch(() => setCargando(false));
    }, 300);

    return () => clearTimeout(timerRef.current);
  }, [query]);

  const handleSeleccionar = (producto) => {
    setQuery(producto.nombre);
    setMostrar(false);
    onSeleccionar(producto); // avisa al catálogo qué producto seleccionó
  };

  const handleLimpiar = () => {
    setQuery("");
    setSugerencias([]);
    setMostrar(false);
    onSeleccionar(null); // limpia el filtro del catálogo
  };

  return (
    <div className="buscador">
      <div className="buscador__campo">
        <input
          className="buscador__input"
          type="text"
          placeholder="Buscar por nombre, marca o categoría..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => sugerencias.length > 0 && setMostrar(true)}
        />
        {query && (
          <button className="buscador__limpiar" onClick={handleLimpiar}>✕</button>
        )}
        {cargando && <span className="buscador__spinner">⏳</span>}
      </div>

      {/* Lista de sugerencias */}
      {mostrar && sugerencias.length > 0 && (
        <ul className="buscador__sugerencias">
          {sugerencias.map((p) => (
            <li key={p.id} className="buscador__item"
              onClick={() => handleSeleccionar(p)}>
              <span className="buscador__item-nombre">{p.nombre}</span>
              <span className="buscador__item-marca">{p.marca}</span>
              <span className="buscador__item-precio">S/. {p.precio}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Sin resultados */}
      {mostrar && sugerencias.length === 0 && !cargando && query.length >= 2 && (
        <div className="buscador__vacio">
          No se encontraron productos para "{query}"
        </div>
      )}
    </div>
  );
}

export default Buscador;