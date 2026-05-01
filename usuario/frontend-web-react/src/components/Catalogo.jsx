import { useEffect, useState } from "react";
import "../styles/Catalogo.css";

function Catalogo() {
  const [productos, setProductos]   = useState([]);
  const [cargando, setCargando]     = useState(true);
  const [categoria, setCategoria]   = useState("");
  const [marca, setMarca]           = useState("");
  const [precioMin, setPrecioMin]   = useState("");
  const [precioMax, setPrecioMax]   = useState("");
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas]         = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/productos")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setCargando(false);
        setCategorias([...new Set(data.map((p) => p.categoria))].sort());
        setMarcas([...new Set(data.map((p) => p.marca))].sort());
      });
  }, []);

  const aplicarFiltros = () => {
    const params = new URLSearchParams();
    if (categoria) params.append("categoria", categoria);
    if (marca)     params.append("marca", marca);
    if (precioMin) params.append("precioMin", precioMin);
    if (precioMax) params.append("precioMax", precioMax);

    setCargando(true);
    fetch(`http://localhost:8080/productos/filtrar?${params}`)
      .then((res) => res.json())
      .then((data) => { setProductos(data); setCargando(false); });
  };

  const limpiarFiltros = () => {
    setCategoria(""); setMarca(""); setPrecioMin(""); setPrecioMax("");
    setCargando(true);
    fetch("http://localhost:8080/productos")
      .then((res) => res.json())
      .then((data) => { setProductos(data); setCargando(false); });
  };

  return (
    <div className="catalogo">
      <h2 className="catalogo__titulo">Nuestros Productos</h2>

      <div className="catalogo__filtros">
        <select className="catalogo__select" value={categoria}
          onChange={(e) => setCategoria(e.target.value)}>
          <option value="">Todas las categorías</option>
          {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <select className="catalogo__select" value={marca}
          onChange={(e) => setMarca(e.target.value)}>
          <option value="">Todas las marcas</option>
          {marcas.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>

        <input className="catalogo__input" type="number"
          placeholder="Precio mín" value={precioMin}
          onChange={(e) => setPrecioMin(e.target.value)} />

        <input className="catalogo__input" type="number"
          placeholder="Precio máx" value={precioMax}
          onChange={(e) => setPrecioMax(e.target.value)} />

        <button className="catalogo__btn-filtrar" onClick={aplicarFiltros}>
          Filtrar
        </button>
        <button className="catalogo__btn-limpiar" onClick={limpiarFiltros}>
          Limpiar
        </button>
      </div>

      {cargando ? (
        <p>Cargando productos...</p>
      ) : productos.length === 0 ? (
        <p className="catalogo__vacio">
          No se encontraron productos con esos filtros.
        </p>
      ) : (
        <div className="catalogo__grid">
          {productos.map((producto) => (
            <div key={producto.id} className="producto-card">
              <img className="producto-card__img"
                src={producto.imagenUrl} alt={producto.nombre} />
              <div className="producto-card__info">
                <h3 className="producto-card__nombre">{producto.nombre}</h3>
                <p className="producto-card__marca">{producto.marca}</p>
                <p className="producto-card__precio">S/. {producto.precio}</p>
                <p className="producto-card__stock">Stock: {producto.stock}</p>
                {producto.descuento > 0 && (
                  <span className="producto-card__descuento">
                    -{producto.descuento}%
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Catalogo;