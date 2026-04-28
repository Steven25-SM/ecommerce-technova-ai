function RegisterModal({ cerrar }) {
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Crear cuenta</h2>

        <input placeholder="Nombres" style={inputStyle} />
        <input placeholder="Apellidos" style={inputStyle} />
        <input placeholder="Correo" style={inputStyle} />
        <input placeholder="Contraseña" style={inputStyle} />
        <input placeholder="Número" style={inputStyle} />
        <input placeholder="DNI" style={inputStyle} />
        <input type="date" style={inputStyle} />

        <button style={btnStyle}>
          Registrarse
        </button>

        <button onClick={cerrar}>
          Cerrar
        </button>
      </div>
    </div>
  );
}