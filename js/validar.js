const validarFormulario = (idFormulario) => {
    const listaCampos = document.querySelectorAll(`#${idFormulario} [data-validate]`);
    let validacion = true;
  
    if (listaCampos.length > 0) {
      listaCampos.forEach(elemento => {
        const tipoElemento = elemento.getAttribute("type");
        const valor = elemento.value.trim(); // Elimina espacios al inicio y final
  
        // Validamos campos vacíos
        if (valor === "") {
          validacion = false;
          resaltarError(elemento);
        }
  
        // Validamos el campo Email sin que el navegador interfiera
        if (tipoElemento === "email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(valor)) {
            validacion = false;
            resaltarError(elemento);
          }
        }
  
        // Validamos el checkbox
        if (tipoElemento === "checkbox" && !elemento.checked) {
          validacion = false;
          resaltarError(elemento);
        }
      });
    }
    return validacion;
  };
  
  // Función para resaltar errores en los campos
  const resaltarError = (elemento) => {
    elemento.style.setProperty("border", "1px solid red");
    setTimeout(() => {
      elemento.style.setProperty("border", "");
    }, 2000);
  };
  
  const enviarFormulario = (event) => {
    event.preventDefault(); // Evita el envío si hay errores
  
    if (!validarFormulario("formValidacion")) {
      mostrarAlertaError();
    } else {
      alert("Nos contactaremos con vos a la brevedad 🐾");
    }
  };
  
  // Función para mostrar el alert de error
  const mostrarAlertaError = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      }
    });
  
    Toast.fire({
      icon: "error",
      title: "Error al completar el formulario"
    });
  };
  