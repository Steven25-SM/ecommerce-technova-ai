import "../styles/Toast.css";

// Toast — notificación temporal que aparece y desaparece sola
function Toast({ mensaje }) {
  return (
    <div className="toast">
      {mensaje}
    </div>
  );
}

export default Toast;