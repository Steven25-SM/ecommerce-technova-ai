import { ShoppingCart } from "lucide-react";
import "../styles/Header.css";

function Header({ abrirLogin, usuario, cerrarSesion }) {
  return (
    <header className="header">
      <h2 className="header__logo">TechNova AI</h2>

      <div className="header__acciones">
        {usuario ? (
          <>
            <span className="header__bienvenida">
              Hola, {usuario.nombre} 👋
            </span>
            <button onClick={cerrarSesion} className="header__btn">
              Cerrar sesión
            </button>
          </>
        ) : (
          <button onClick={abrirLogin} className="header__btn">
            Iniciar sesión
          </button>
        )}
        <ShoppingCart size={28} color="white" />
      </div>
    </header>
  );
}

export default Header;