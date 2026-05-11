import { useState, useEffect } from "react";
import "../styles/Carrito.css";

function Carrito({ usuario, cerrar, onProcederCheckout }) {
  const [items, setItems]       = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarCarrito();
  }, [usuario]);

  const cargarCarrito = () => {
    if (usuario) {
      // Logueado → cargamos desde BD
      fetch(`http://localhost:8081/carrito/${usuario.id}`)
        .then((res) => res.json())
        .then((data) => { setItems(data); setCargando(false); });
    } else {
      // Anónimo → cargamos desde localStorage
      const local = JSON.parse(localStorage.getItem("carrito") || "[]");
      // Convertimos al mismo formato que devuelve la BD
      const itemsFormateados = local.map((i, idx) => ({
        id: idx,
        cantidad: i.cantidad,
        producto: i.producto,
      }));
      setItems(itemsFormateados);
      setCargando(false);
    }
  };

  const total = items.reduce(
    (acc, item) => acc + item.producto.precio * item.cantidad, 0
  );

  const actualizarCantidad = (itemId, nuevaCantidad) => {
    if (usuario) {
      fetch(`http://localhost:8081/carrito/actualizar/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cantidad: nuevaCantidad }),
      }).then(() => cargarCarrito());
    } else {
      // Anónimo → actualizamos localStorage
      const local = JSON.parse(localStorage.getItem("carrito") || "[]");
      if (nuevaCantidad <= 0) {
        const actualizado = local.filter((_, idx) => idx !== itemId);
        localStorage.setItem("carrito", JSON.stringify(actualizado));
      } else {
        local[itemId].cantidad = nuevaCantidad;
        localStorage.setItem("carrito", JSON.stringify(local));
      }
      cargarCarrito();
    }
  };

  const eliminar = (itemId) => {
    if (usuario) {
      fetch(`http://localhost:8081/carrito/eliminar/${itemId}`, {
        method: "DELETE",
      }).then(() => cargarCarrito());
    } else {
      const local = JSON.parse(localStorage.getItem("carrito") || "[]");
      local.splice(itemId, 1);
      localStorage.setItem("carrito", JSON.stringify(local));
      cargarCarrito();
    }
  };

  return (
    <div className="carrito__overlay" onClick={cerrar}>
      <div className="carrito__panel" onClick={(e) => e.stopPropagation()}>
        <div className="carrito__header">
          <h2>🛒 Mi Carrito</h2>
          <button className="carrito__cerrar" onClick={cerrar}>✕</button>
        </div>

        {cargando ? (
          <p className="carrito__vacio">Cargando...</p>
        ) : items.length === 0 ? (
          <p className="carrito__vacio">Tu carrito está vacío 😢</p>
        ) : (
          <>
            <div className="carrito__items">
              {items.map((item) => (
                <div key={item.id} className="carrito__item">
                  <img src={item.producto.imagenUrl}
                    alt={item.producto.nombre}
                    className="carrito__item-img" />
                  <div className="carrito__item-info">
                    <p className="carrito__item-nombre">{item.producto.nombre}</p>
                    <p className="carrito__item-precio">S/. {item.producto.precio}</p>
                    <div className="carrito__item-controles">
                      <button onClick={() =>
                        actualizarCantidad(item.id, item.cantidad - 1)}>−</button>
                      <span>{item.cantidad}</span>
                      <button onClick={() =>
                        actualizarCantidad(item.id, item.cantidad + 1)}>+</button>
                    </div>
                  </div>
                  <button className="carrito__item-eliminar"
                    onClick={() => eliminar(item.id)}>🗑️</button>
                </div>
              ))}
            </div>

            <div className="carrito__footer">
              <div className="carrito__total">
                <span>Total:</span>
                <span>S/. {total.toFixed(2)}</span>
              </div>
              <button className="carrito__checkout"
                onClick={onProcederCheckout}>
                Proceder al pago →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Carrito;