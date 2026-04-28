function Hero() {
  return (
    <section style={{
      height: "90vh",
      backgroundImage: "url('./images/hero-section.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      textAlign: "center",
      position: "relative"
    }}>
        <div style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.35)"
      }}>
        <h1 style={{
          color: "white",
        }}>Productos que en verdad encajan contigo</h1>
      </div>
      
    </section>
  );
}

export default Hero;