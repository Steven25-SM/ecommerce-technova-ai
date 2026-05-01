import { useState } from "react";
import "../styles/Modal.css";

function RegisterModal({ cerrar, abrirLogin }) {
  const [form, setForm]         = useState({
    nombre: "", apellidos: "", correo: "",
    password: "", telefono: "", dni: "", fechaNacimiento: "",
  });
  const [error, setError]       = useState("");
  const [exito, setExito]       = useState("");
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegistro = async () => {
    if (Object.values(form).some((v) => v.trim() === "")) {
      setError("Completa todos los campos"); return;
    }
    if (!form.correo.includes("@")) { setError("Correo inválido"); return; }
    if (form.dni.length !== 8)      { setError("DNI debe tener 8 dígitos"); return; }

    setCargando(true);
    setError("");

    try {
      const res  = await fetch("http://localhost:8080/usuarios/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) { setError(data.error || "Error al registrarse"); return; }

      setExito(`¡Bienvenido ${data.nombre}! Ahora inicia sesión.`);
      setTimeout(() => abrirLogin(), 2000);
    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="modal__overlay">
      <div className="modal__caja">
        <h2 className="modal__titulo">Crear cuenta</h2>

        {[
          { name: "nombre",          placeholder: "Nombres",     type: "text" },
          { name: "apellidos",       placeholder: "Apellidos",   type: "text" },
          { name: "correo",          placeholder: "Correo",      type: "email" },
          { name: "password",        placeholder: "Contraseña",  type: "password" },
          { name: "telefono",        placeholder: "Teléfono",    type: "text" },
          { name: "dni",             placeholder: "DNI",         type: "text" },
          { name: "fechaNacimiento", placeholder: "",            type: "date" },
        ].map(({ name, placeholder, type }) => (
          <input key={name} className="modal__input"
            name={name} placeholder={placeholder} type={type}
            value={form[name]} onChange={handleChange}
            {...(name === "dni" ? { maxLength: 8 } : {})}
          />
        ))}

        {error && <p className="modal__error">{error}</p>}
        {exito && <p className="modal__exito">{exito}</p>}

        <button className="modal__btn-primary" onClick={handleRegistro} disabled={cargando}>
          {cargando ? "Registrando..." : "Registrarse"}
        </button>

        <p className="modal__texto">
          ¿Ya tienes cuenta?{" "}
          <span className="modal__link" onClick={abrirLogin}>Iniciar sesión</span>
        </p>

        <button className="modal__btn-secondary" onClick={cerrar}>Cerrar</button>
      </div>
    </div>
  );
}

export default RegisterModal;