import Header from "./Header";
import Hero from "./Hero";
import Catalogo from "./Catalogo";
import LoginModal from "./LoginModal";
import { useState } from "react";

function App() {
  const [mostrarLogin, setMostrarLogin] = useState(false);

  return (
    <div>
      <Header abrirLogin={() => setMostrarLogin(true)} />
      <Hero />
      <Catalogo />

      {mostrarLogin && <LoginModal />}
    </div>
  );
}

export default App;