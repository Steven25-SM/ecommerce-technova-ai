<<<<<<< HEAD
import { useState } from "react";
=======
import { useState, useEffect } from "react";
>>>>>>> 775d2eb (Implementación de Busqueda y carrito)
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Catalogo from "./components/Catalogo";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
<<<<<<< HEAD
import Admin from "./Admin";

function Home() {
  const [modalAbierto, setModalAbierto] = useState(null);
  const [usuario, setUsuario] = useState(null);
=======
import Carrito from "./components/Carrito";
import Checkout from "./components/Checkout";
import Favoritos from "./components/Favoritos";
import Toast from "./components/Toast";
import Admin from "./Admin";
import AdminLogin from "./AdminLogin";

>>>>>>> 775d2eb (Implementación de Busqueda y carrito)

function Home() {
  const [modalAbierto, setModalAbierto]         = useState(null);
  const [usuario, setUsuario]                   = useState(null);
  const [carritoAbierto, setCarritoAbierto]     = useState(false);
  const [checkoutAbierto, setCheckoutAbierto]   = useState(false);
  const [favoritosAbierto, setFavoritosAbierto] = useState(false);
  const [refreshCarrito, setRefreshCarrito]     = useState(0);
  const [totalItems, setTotalItems]             = useState(0);
  const [toast, setToast]                       = useState(null);

  // Calculamos el total de items del carrito para el badge
  useEffect(() => {
    calcularTotalItems();
  }, [refreshCarrito, usuario]);

  const calcularTotalItems = () => {
    if (usuario) {
      // Usuario logueado → contamos desde la BD
      fetch(`http://localhost:8081/carrito/${usuario.id}`)
        .then((res) => res.json())
        .then((data) => {
          const total = data.reduce((acc, item) => acc + item.cantidad, 0);
          setTotalItems(total);
        })
        .catch(() => setTotalItems(0));
    } else {
      // Usuario anónimo → contamos desde localStorage
      const local = JSON.parse(localStorage.getItem("carrito") || "[]");
      const total = local.reduce((acc, item) => acc + item.cantidad, 0);
      setTotalItems(total);
    }
  };

  // Muestra un toast por 3 segundos
  const mostrarToast = (mensaje) => {
    setToast(mensaje);
    setTimeout(() => setToast(null), 3000);
  };

  const agregarAlCarrito = (producto) => {
    if (usuario) {
      // Logueado → guardamos en BD
      fetch("http://localhost:8081/carrito/agregar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuarioId: usuario.id, productoId: producto.id }),
      }).then(() => {
        setRefreshCarrito(r => r + 1);
        mostrarToast(`✅ ${producto.nombre} agregado al carrito`);
      });
    } else {
      // Anónimo → guardamos en localStorage
      const local = JSON.parse(localStorage.getItem("carrito") || "[]");
      const existente = local.find(i => i.productoId === producto.id);
      if (existente) {
        existente.cantidad += 1;
      } else {
        local.push({ productoId: producto.id, cantidad: 1, producto });
      }
      localStorage.setItem("carrito", JSON.stringify(local));
      setRefreshCarrito(r => r + 1);
      mostrarToast(`✅ ${producto.nombre} agregado al carrito`);
    }
  };

  const toggleFavorito = (productoId) => {
    if (!usuario) { setModalAbierto("login"); return; }
    fetch("http://localhost:8081/favoritos/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuarioId: usuario.id, productoId }),
    });
  };

  return (
    <div>
      <Header
        abrirLogin={() => setModalAbierto("login")}
        usuario={usuario}
        cerrarSesion={() => setUsuario(null)}
        abrirCarrito={() => setCarritoAbierto(true)}
        abrirFavoritos={() => setFavoritosAbierto(true)}
        totalItems={totalItems}
      />
      <Hero />
<<<<<<< HEAD
      <Catalogo />
=======
      <Catalogo
        onAgregarAlCarrito={agregarAlCarrito}
        onToggleFavorito={toggleFavorito}
        usuario={usuario}
      />

      {toast && <Toast mensaje={toast} />}

>>>>>>> 775d2eb (Implementación de Busqueda y carrito)
      {modalAbierto === "login" && (
        <LoginModal
          cerrar={() => setModalAbierto(null)}
          abrirRegistro={() => setModalAbierto("registro")}
          // ✅ Así debe quedar — con migración de localStorage a BD
onLoginExitoso={async (data) => {
  setUsuario(data);
  setModalAbierto(null);

  // Migramos carrito anónimo a la BD
  const local = JSON.parse(localStorage.getItem("carrito") || "[]");
  if (local.length > 0) {
    for (const item of local) {
      await fetch("http://localhost:8081/carrito/agregar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuarioId: data.id,
          productoId: item.producto.id,
        }),
      });
    }
    localStorage.removeItem("carrito");
    setRefreshCarrito(r => r + 1);
  }
}}
        />
      )}
      {modalAbierto === "registro" && (
        <RegisterModal
          cerrar={() => setModalAbierto(null)}
          abrirLogin={() => setModalAbierto("login")}
        />
      )}
      {carritoAbierto && (
        <Carrito
          usuario={usuario}
          cerrar={() => setCarritoAbierto(false)}
          key={refreshCarrito}
          onProcederCheckout={() => {
            setCarritoAbierto(false);
            setCheckoutAbierto(true);
          }}
        />
      )}
      {checkoutAbierto && (
        <Checkout
          usuario={usuario}
          cerrar={() => setCheckoutAbierto(false)}
          onPedidoConfirmado={() => setRefreshCarrito(r => r + 1)}
        />
      )}
      {favoritosAbierto && (
        <Favoritos
          usuario={usuario}
          cerrar={() => setFavoritosAbierto(false)}
          onAgregarAlCarrito={agregarAlCarrito}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;