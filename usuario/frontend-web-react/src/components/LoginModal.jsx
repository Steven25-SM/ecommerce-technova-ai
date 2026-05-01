import { useState } from "react";
import "../styles/Modal.css";

function LoginModal({ cerrar, abrirRegistro, onLoginExitoso }) {
  const [correo, setCorreo]       = useState("");
  const [password, setPassword]   = useState("");
  const [error, setError]         = useState("");
  const [cargando, setCargando]   = useState(false);

  const handleLogin = async () => {
    if (!correo || !password) { setError("Completa todos los campos"); return; }

    setCargando(true);
    setError("");

    try {
      const res  = await fetch("http://localhost:8080/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password }),
      });
      const data = await res.json();

      if (!res.ok) { setError(data.error || "Credenciales incorrectas"); return; }

      onLoginExitoso(data);
    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="modal__overlay">
      <div className="modal__caja">
        <h2 className="modal__titulo">Iniciar sesión</h2>

        <input className="modal__input" type="email" placeholder="Correo"
          value={correo} onChange={(e) => setCorreo(e.target.value)} />

        <input className="modal__input" type="password" placeholder="Contraseña"
          value={password} onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()} />

        {error && <p className="modal__error">{error}</p>}

        <button className="modal__btn-primary" onClick={handleLogin} disabled={cargando}>
          {cargando ? "Ingresando..." : "Ingresar"}
        </button>

        <p className="modal__texto">
          ¿No tienes cuenta?{" "}
          <span className="modal__link" onClick={abrirRegistro}>Crear cuenta</span>
        </p>

        <button className="modal__btn-secondary" onClick={cerrar}>Cerrar</button>
      </div>
    </div>
  );
}

export default LoginModal;