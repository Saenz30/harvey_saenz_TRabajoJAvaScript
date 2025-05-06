document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const nombre = document.getElementById("nombre");
    const apellidos = document.getElementById("apellidos");
    const telefono = document.getElementById("telefono");
    const email = document.getElementById("email");
    const producto = document.getElementById("producto");
    const plazo = document.getElementById("plazo");
    const extras = document.querySelectorAll(".extra");
    const presupuesto = document.getElementById("presupuesto");
    const condiciones = document.getElementById("condiciones");
  
    function validarCampo(campo, errorId, mensaje, validacionExtra = () => true) {
      const errorDiv = document.getElementById(errorId);
      if (!campo.value.trim() || !validacionExtra(campo.value.trim())) {
        campo.classList.add("is-invalid");
        errorDiv.textContent = mensaje;
        return false;
      } else {
        campo.classList.remove("is-invalid");
        campo.classList.add("is-valid");
        errorDiv.textContent = "";
        return true;
      }
    }
  
    function validarTelefono(valor) {
      return /^[0-9]{9}$/.test(valor);
    }
  
    function validarEmail(valor) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
    }
  
    function calcularPresupuesto() {
      const productoValue = parseFloat(producto.value) || 0;
      const extrasTotal = Array.from(extras)
        .filter(e => e.checked)
        .reduce((sum, e) => sum + parseFloat(e.value), 0);
      const total = productoValue + extrasTotal;
      presupuesto.value = `$${total}`;
    }
  
    extras.forEach(extra => extra.addEventListener("change", calcularPresupuesto));
    producto.addEventListener("change", calcularPresupuesto);
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const validNombre = validarCampo(nombre, "nombreError", "Nombre es obligatorio.");
      const validApellidos = validarCampo(apellidos, "apellidosError", "Apellidos son obligatorios.");
      const validTelefono = validarCampo(telefono, "telefonoError", "Teléfono inválido.", validarTelefono);
      const validEmail = validarCampo(email, "emailError", "Email inválido.", validarEmail);
  
      if (!producto.value) {
        producto.classList.add("is-invalid");
      } else {
        producto.classList.remove("is-invalid");
        producto.classList.add("is-valid");
      }
  
      if (!condiciones.checked) {
        condiciones.classList.add("is-invalid");
      } else {
        condiciones.classList.remove("is-invalid");
        condiciones.classList.add("is-valid");
      }
  
      if (validNombre && validApellidos && validTelefono && validEmail && producto.value && condiciones.checked) {
        alert("Formulario enviado correctamente.");
        form.reset();
        presupuesto.value = "";
        document.querySelectorAll(".is-valid").forEach(el => el.classList.remove("is-valid"));
      }
    });
  });
  

// volver al inicio
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
