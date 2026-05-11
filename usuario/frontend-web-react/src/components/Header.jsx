import { ShoppingCart, Heart } from "lucide-react";
import "../styles/Header.css";

function Header({ abrirLogin, usuario, cerrarSesion, abrirCarrito, abrirFavoritos, totalItems }) {
  return (
    <header className="header">
      <h2 className="header__logo">TechNova AI</h2>

      <div className="header__acciones">
        {usuario ? (
          <>
            <span className="header__bienvenida">Hola, {usuario.nombre} 👋</span>
            <button onClick={cerrarSesion} className="header__btn">
              Cerrar sesión
            </button>
          </>
        ) : (
          <button onClick={abrirLogin} className="header__btn">
            Iniciar sesión
          </button>
        )}

        <Heart size={26} color="white" style={{ cursor: "pointer" }}
          onClick={abrirFavoritos} />

        {/* Carrito con badge */}
        <div className="header__carrito" onClick={abrirCarrito}>
          <ShoppingCart size={28} color="white" />
          {totalItems > 0 && (
            <span className="header__badge">{totalItems}</span>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;