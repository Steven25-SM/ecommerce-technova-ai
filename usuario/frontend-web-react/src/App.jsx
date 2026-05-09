import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Catalogo from "./components/Catalogo";
import LoginModal from "./components/LoginModal";
import RegisterModal from "./components/RegisterModal";
import Admin from "./Admin";

function Home() {
  const [modalAbierto, setModalAbierto] = useState(null);
  const [usuario, setUsuario] = useState(null);

  const handleLoginExitoso = (datosUsuario) => {
    setUsuario(datosUsuario);
    setModalAbierto(null);
  };

  return (
    <div>
      <Header
        abrirLogin={() => setModalAbierto("login")}
        usuario={usuario}
        cerrarSesion={() => setUsuario(null)}
      />
      <Hero />
      <Catalogo />
      {modalAbierto === "login" && (
        <LoginModal
          cerrar={() => setModalAbierto(null)}
          abrirRegistro={() => setModalAbierto("registro")}
          onLoginExitoso={handleLoginExitoso}
        />
      )}
      {modalAbierto === "registro" && (
        <RegisterModal
          cerrar={() => setModalAbierto(null)}
          abrirLogin={() => setModalAbierto("login")}
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