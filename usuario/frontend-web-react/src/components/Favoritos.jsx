import { useState, useEffect } from "react";
import "../styles/Favoritos.css";

function Favoritos({ usuario, cerrar, onAgregarAlCarrito }) {
  const [favoritos, setFavoritos] = useState([]);
  const [cargando, setCargando]   = useState(true);

  useEffect(() => {
    if (!usuario) return;
    cargarFavoritos();
  }, [usuario]);

  const cargarFavoritos = () => {
    fetch(`http://localhost:8081/favoritos/${usuario.id}`)
      .then((res) => res.json())
      .then((data) => { setFavoritos(data); setCargando(false); });
  };

  const toggleFavorito = (productoId) => {
    fetch("http://localhost:8081/favoritos/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuarioId: usuario.id, productoId }),
    }).then(() => cargarFavoritos());
  };

  return (
    <div className="favoritos__overlay" onClick={cerrar}>
      <div className="favoritos__panel" onClick={(e) => e.stopPropagation()}>
        <div className="favoritos__header">
          <h2>❤️ Mis Favoritos</h2>
          <button className="favoritos__cerrar" onClick={cerrar}>✕</button>
        </div>

        {!usuario ? (
          <p className="favoritos__vacio">Inicia sesión para ver tus favoritos.</p>
        ) : cargando ? (
          <p className="favoritos__vacio">Cargando...</p>
        ) : favoritos.length === 0 ? (
          <p className="favoritos__vacio">No tienes productos favoritos aún 💔</p>
        ) : (
          <div className="favoritos__lista">
            {favoritos.map((fav) => (
              <div key={fav.id} className="favoritos__item">
                <img src={fav.producto.imagenUrl}
                  alt={fav.producto.nombre}
                  className="favoritos__item-img" />
                <div className="favoritos__item-info">
                  <p className="favoritos__item-nombre">{fav.producto.nombre}</p>
                  <p className="favoritos__item-marca">{fav.producto.marca}</p>
                  <p className="favoritos__item-precio">
                    S/. {fav.producto.precio}
                  </p>
                  <p className={`favoritos__item-stock ${!fav.producto.disponible ? "agotado" : ""}`}>
                    {fav.producto.disponible ? "✅ Disponible" : "❌ No disponible"}
                  </p>
                </div>
                <div className="favoritos__item-acciones">
                  <button className="favoritos__btn-carrito"
                    onClick={() => onAgregarAlCarrito(fav.producto.id)}
                    disabled={!fav.producto.disponible}>
                    🛒
                  </button>
                  <button className="favoritos__btn-quitar"
                    onClick={() => toggleFavorito(fav.producto.id)}>
                    💔
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favoritos;