import { ShoppingCart } from "lucide-react";

function Header({ abrirLogin }) {
  return (
    <header style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 40px",
      backgroundColor: "black",
      color: "white",
      borderBottom: "2px solid #01edf5"
    }}>
      <h2 style={{color: "white"}}>TechNova AI</h2>

      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "30px"
      }}>

        <button
          onClick={abrirLogin}
          style={{
            backgroundColor: "#01edf5",
            color: "black",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            fontFamily: "Arial"
          }}
        >
          Iniciar sesión
        </button>
        <ShoppingCart size={28} color="white" />
      </div>
    </header>
  );
}

export default Header;