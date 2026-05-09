import { useEffect, useState } from "react";

const API = "http://localhost:8081";

function Admin() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    nombre: "", marca: "", precio: "", stock: "",
    categoria: "", imagenUrl: "", disponible: true
  });
  const [editId, setEditId] = useState(null);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => { cargarProductos(); }, []);

  const cargarProductos = () => {
    fetch(`${API}/productos`)
      .then(r => r.json())
      .then(setProductos);
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const guardar = () => {
    const url = editId ? `${API}/productos/${editId}` : `${API}/productos`;
    const method = editId ? "PUT" : "POST";
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, precio: parseFloat(form.precio), stock: parseInt(form.stock) })
    }).then(() => {
      setMensaje(editId ? "Producto actualizado" : "Producto creado");
      setForm({ nombre: "", marca: "", precio: "", stock: "", categoria: "", imagenUrl: "", disponible: true });
      setEditId(null);
      cargarProductos();
      setTimeout(() => setMensaje(""), 3000);
    });
  };

  const editar = p => {
    setForm({ nombre: p.nombre, marca: p.marca, precio: p.precio, stock: p.stock, categoria: p.categoria, imagenUrl: p.imagenUrl || "", disponible: p.disponible });
    setEditId(p.id);
  };

  const deshabilitar = id => {
    fetch(`${API}/productos/${id}/deshabilitar`, { method: "PATCH" })
      .then(() => { cargarProductos(); setMensaje("Producto deshabilitado"); setTimeout(() => setMensaje(""), 3000); });
  };

  const estiloInput = { width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ddd", marginBottom: "12px", fontSize: "14px", boxSizing: "border-box" };
  const estiloBtn = (color) => ({ padding: "10px 18px", borderRadius: "8px", border: "none", backgroundColor: color, color: "white", cursor: "pointer", fontWeight: "bold", fontSize: "13px" });

  return (
    <div style={{ fontFamily: "Arial", backgroundColor: "#f4f6f8", minHeight: "100vh", padding: "30px" }}>
      <h1 style={{ textAlign: "center", color: "#1a1a2e", marginBottom: "30px" }}>Panel de Administracion - TechNova AI</h1>

      {mensaje && (
        <div style={{ background: "#d4edda", color: "#155724", padding: "12px 20px", borderRadius: "8px", marginBottom: "20px", textAlign: "center", fontWeight: "bold" }}>
          {mensaje}
        </div>
      )}

      <div style={{ background: "white", borderRadius: "12px", padding: "30px", marginBottom: "30px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
        <h2 style={{ marginBottom: "20px", color: "#333" }}>{editId ? "Editar Producto" : "Agregar Producto"}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} style={estiloInput} />
          <input name="marca" placeholder="Marca" value={form.marca} onChange={handleChange} style={estiloInput} />
          <input name="precio" placeholder="Precio" value={form.precio} onChange={handleChange} style={estiloInput} />
          <input name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} style={estiloInput} />
          <input name="categoria" placeholder="Categoria" value={form.categoria} onChange={handleChange} style={estiloInput} />
          <input name="imagenUrl" placeholder="URL de imagen" value={form.imagenUrl} onChange={handleChange} style={estiloInput} />
        </div>
        <label style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "15px" }}>
          <input type="checkbox" name="disponible" checked={form.disponible} onChange={handleChange} />
          <span>Disponible</span>
        </label>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={guardar} style={estiloBtn("#f5c518")}>{editId ? "Actualizar" : "Guardar"}</button>
          {editId && (
            <button onClick={() => { setEditId(null); setForm({ nombre: "", marca: "", precio: "", stock: "", categoria: "", imagenUrl: "", disponible: true }); }} style={estiloBtn("#6c757d")}>
              Cancelar
            </button>
          )}
        </div>
      </div>

      <div style={{ background: "white", borderRadius: "12px", padding: "30px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", overflowX: "auto" }}>
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Productos ({productos.length})</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#1a1a2e", color: "white" }}>
              <th style={{ padding: "12px 15px", textAlign: "left" }}>ID</th>
              <th style={{ padding: "12px 15px", textAlign: "left" }}>Nombre</th>
              <th style={{ padding: "12px 15px", textAlign: "left" }}>Marca</th>
              <th style={{ padding: "12px 15px", textAlign: "left" }}>Precio</th>
              <th style={{ padding: "12px 15px", textAlign: "left" }}>Stock</th>
              <th style={{ padding: "12px 15px", textAlign: "left" }}>Categoria</th>
              <th style={{ padding: "12px 15px", textAlign: "left" }}>Disponible</th>
              <th style={{ padding: "12px 15px", textAlign: "left" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p, i) => (
              <tr key={p.id} style={{ backgroundColor: i % 2 === 0 ? "#f9f9f9" : "white", borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "12px 15px", fontSize: "13px" }}>{p.id}</td>
                <td style={{ padding: "12px 15px", fontSize: "13px", fontWeight: "bold" }}>{p.nombre}</td>
                <td style={{ padding: "12px 15px", fontSize: "13px" }}>{p.marca}</td>
                <td style={{ padding: "12px 15px", fontSize: "13px" }}>S/. {p.precio}</td>
                <td style={{ padding: "12px 15px", fontSize: "13px" }}>{p.stock}</td>
                <td style={{ padding: "12px 15px", fontSize: "13px" }}>{p.categoria}</td>
                <td style={{ padding: "12px 15px", fontSize: "13px" }}>{p.disponible ? "Si" : "No"}</td>
                <td style={{ padding: "12px 15px", display: "flex", gap: "8px" }}>
                  <button onClick={() => editar(p)} style={estiloBtn("#f5c518")}>Editar</button>
                  <button onClick={() => deshabilitar(p.id)} style={estiloBtn("#dc3545")}>Deshabilitar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;