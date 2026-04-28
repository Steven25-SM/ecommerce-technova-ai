import { useEffect, useState } from "react";

function Catalogo() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ marginBottom: "30px",
        fontSize: "30px"
       }}>
        Nuestros Productos
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "25px"
      }}>
        {productos.map((producto) => (
          <div
            key={producto.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
              backgroundColor: "white"
            }}
          >
            <img
              src={producto.imagenUrl}
              alt={producto.nombre}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover"
              }}
            />

            <div style={{ padding: "20px" }}>
              <h3 style={{
                color: "black"
              }}>{producto.nombre}</h3>
              <p>{producto.marca}</p>
              <p>S/. {producto.precio}</p>
              <p>Stock: {producto.stock}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalogo;