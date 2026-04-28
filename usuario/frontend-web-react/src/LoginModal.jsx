function LoginModal({ cerrar, abrirRegistro }) {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "15px",
        width: "400px"
      }}>
        <h2>Iniciar sesión</h2>

        <input
          type="email"
          placeholder="Correo"
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Contraseña"
          style={inputStyle}
        />

        <button style={btnStyle}>
          Ingresar
        </button>

        <p>
          ¿No tienes cuenta?{" "}
          <span
            onClick={abrirRegistro}
            style={{
              color: "blue",
              cursor: "pointer"
            }}
          >
            Crear cuenta
          </span>
        </p>

        <button onClick={cerrar}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px"
};

const btnStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px"
};

export default LoginModal;