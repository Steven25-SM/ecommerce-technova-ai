import { useState } from "react";

const USUARIOS = [
  { usuario: "steven", password: "steven123" },
  { usuario: "sarai", password: "sarai123" }
];

function AdminLogin({ onLogin }) {
  const [form, setForm] = useState({ usuario: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = () => {
    const encontrado = USUARIOS.find(
      u => u.usuario === form.usuario && u.password === form.password
    );
    if (encontrado) {
      onLogin(encontrado.usuario);
    } else {
      setError("Usuario o contraseña incorrectos");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      <div style={{ background: "white", padding: "40px", borderRadius: "16px", boxShadow: "0 8px 24px rgba(0,0,0,0.12)", width: "360px" }}>
        <h2 style={{ textAlign: "center", color: "#1a1a2e", marginBottom: "8px" }}>TechNova AI</h2>
        <p style={{ textAlign: "center", color: "#666", marginBottom: "30px" }}>Panel de Administracion</p>

        {error && (
          <div style={{ background: "#f8d7da", color: "#721c24", padding: "10px", borderRadius: "8px", marginBottom: "15px", textAlign: "center" }}>
            {error}
          </div>
        )}

        <input
          placeholder="Usuario"
          value={form.usuario}
          onChange={e => setForm(f => ({ ...f, usuario: e.target.value }))}
          style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", marginBottom: "12px", fontSize: "14px", boxSizing: "border-box" }}
        />
        <input
          type="password"
          placeholder="Contrasena"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ddd", marginBottom: "20px", fontSize: "14px", boxSizing: "border-box" }}
        />
        <button
          onClick={handleLogin}
          style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "none", backgroundColor: "#f5c518", color: "#1a1a2e", fontWeight: "bold", fontSize: "15px", cursor: "pointer" }}
        >
          Ingresar
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;