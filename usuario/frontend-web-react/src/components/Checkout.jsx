import { useState } from "react";
import "../styles/Checkout.css";

function Checkout({ usuario, cerrar, onPedidoConfirmado }) {
  const [paso, setPaso]         = useState(1); // 1=dirección, 2=pago, 3=confirmación
  const [form, setForm]         = useState({
    direccionEnvio: "",
    metodoPago: "TARJETA",
    numeroTarjeta: "",
    nombreTarjeta: "",
  });
  const [orden, setOrden]       = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError]       = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const confirmarPedido = async () => {
     if (!usuario) {
    setError("Debes iniciar sesión para completar tu compra");
    return;}
    if (!form.direccionEnvio) { setError("Ingresa una dirección"); return; }
    if (form.metodoPago === "TARJETA" && !form.numeroTarjeta) {
      setError("Ingresa los datos de tarjeta"); return;
    }

    setCargando(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8081/pedidos/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuarioId: usuario.id,
          direccionEnvio: form.direccionEnvio,
          metodoPago: form.metodoPago,
        }),
      });

      const data = await res.json();

      if (!res.ok) { setError(data.error || "Error al procesar el pedido"); return; }

      setOrden(data);
      setPaso(3); // pasamos a la pantalla de confirmación
      onPedidoConfirmado(); // avisamos al carrito que se vació

    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="checkout__overlay" onClick={cerrar}>
      <div className="checkout__panel" onClick={(e) => e.stopPropagation()}>

        <div className="checkout__header">
          <h2>Finalizar compra</h2>
          <button className="checkout__cerrar" onClick={cerrar}>✕</button>
        </div>

        {/* Indicador de pasos */}
        <div className="checkout__pasos">
          {["Envío", "Pago", "Confirmación"].map((label, i) => (
            <div key={i} className={`checkout__paso ${paso >= i+1 ? "activo" : ""}`}>
              <span className="checkout__paso-num">{i + 1}</span>
              <span className="checkout__paso-label">{label}</span>
            </div>
          ))}
        </div>

        <div className="checkout__contenido">

          {/* PASO 1 — Dirección */}
          {paso === 1 && (
            <div>
              <h3>Dirección de envío</h3>
              <textarea
                name="direccionEnvio"
                placeholder="Ej: Av. Javier Prado 1234, San Isidro, Lima"
                value={form.direccionEnvio}
                onChange={handleChange}
                className="checkout__textarea"
                rows={3}
              />
              {error && <p className="checkout__error">{error}</p>}
              <button className="checkout__btn-primary"
                onClick={() => { setError(""); setPaso(2); }}
                disabled={!form.direccionEnvio}>
                Continuar →
              </button>
            </div>
          )}

          {/* PASO 2 — Pago */}
          {paso === 2 && (
            <div>
              <h3>Método de pago</h3>

              <div className="checkout__metodos">
                {["TARJETA", "YAPE", "EFECTIVO"].map((m) => (
                  <button key={m}
                    className={`checkout__metodo ${form.metodoPago === m ? "seleccionado" : ""}`}
                    onClick={() => setForm({ ...form, metodoPago: m })}>
                    {m === "TARJETA" ? "💳 Tarjeta" : m === "YAPE" ? "📱 Yape" : "💵 Efectivo"}
                  </button>
                ))}
              </div>

              {/* Solo mostramos datos de tarjeta si eligió TARJETA */}
              {form.metodoPago === "TARJETA" && (
                <>
                  <input className="checkout__input"
                    name="numeroTarjeta" placeholder="Número de tarjeta"
                    value={form.numeroTarjeta} onChange={handleChange}
                    maxLength={16} />
                  <input className="checkout__input"
                    name="nombreTarjeta" placeholder="Nombre en la tarjeta"
                    value={form.nombreTarjeta} onChange={handleChange} />
                </>
              )}

              {/* Resumen antes de confirmar */}
              <div className="checkout__resumen">
                <h4>Resumen del pedido</h4>
                <p>📍 {form.direccionEnvio}</p>
                <p>💳 {form.metodoPago}</p>
              </div>

              {error && <p className="checkout__error">{error}</p>}

              <div className="checkout__botones">
                <button className="checkout__btn-secondary"
                  onClick={() => setPaso(1)}>← Volver</button>
                <button className="checkout__btn-primary"
                  onClick={confirmarPedido} disabled={cargando}>
                  {cargando ? "Procesando..." : "Confirmar pedido"}
                </button>
              </div>
            </div>
          )}

          {/* PASO 3 — Confirmación */}
          {paso === 3 && orden && (
            <div className="checkout__confirmacion">
              <div className="checkout__check">✅</div>
              <h3>¡Pedido confirmado!</h3>
              <p className="checkout__orden-num">
                Número de orden: <strong>{orden.numeroOrden}</strong>
              </p>
              <p className="checkout__total">
                Total: <strong>S/. {orden.total?.toFixed(2)}</strong>
              </p>
              <p style={{ color: "#666", fontSize: "14px" }}>
                Recibirás tu pedido en la dirección indicada.
              </p>
              <button className="checkout__btn-primary" onClick={cerrar}>
                Volver a la tienda
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;