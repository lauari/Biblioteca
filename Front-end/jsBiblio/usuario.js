var url = "http://localhost:8080/api/v1/usuario/";


// Función para listar los usuarios

function listaUsuario() {
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            console.log(result);
            var cuerpoTablaU = document.getElementById("cuerpoTablaU");
            cuerpoTablaU.innerHTML = "";

            result.forEach(function (usuario) {
                var trRegistro = document.createElement("tr");

                // Crear celdas y añadir los datos
                var celdaId = document.createElement("td");
                var celdaNombre = document.createElement("td");
                var celdaDirección = document.createElement("td");
                var celdaCorreo = document.createElement("td");
                var celdaTipoUsuario = document.createElement("td");


                // Asignar valores a las celdas
                celdaId.innerText = usuario.idUsuario;  // Asegúrate de que el campo id sea correcto
                celdaNombre.innerText = usuario.nombre;
                celdaDirección.innerText = usuario.direccion;
                celdaCorreo.innerText = usuario.correo;
                celdaTipoUsuario.innerText = usuario.tipoUsuario;


                // Añadir celdas al registro
                trRegistro.appendChild(celdaId);
                trRegistro.appendChild(celdaNombre);
                trRegistro.appendChild(celdaDirección);
                trRegistro.appendChild(celdaCorreo);
                trRegistro.appendChild(celdaTipoUsuario);

                // Añadir el registro a la tabla
                cuerpoTablaU.appendChild(trRegistro);
            });
        },
        error: function (error) {
            console.error("Error en la petición:", error);
            alert("Error en la petición: " + error.statusText);
        }
    });
}


// Función para agregar un libro
function agregarUsuario() {
    let nombre = document.getElementById("nombre").value;
    let direccion = document.getElementById("direccion").value;
    let correo = document.getElementById("correo").value;
    let tipoUsuario = document.getElementById("tipoUsuario").value;


    // Datos del formulario
    let formData = {
        "nombre": nombre,
        "direccion": direccion,
        "correo": correo,
        "tipoUsuario": tipoUsuario
    };

    $.ajax({
        url: url,
        type: "POST",
        data: formData,
        success: function (result) {
            Swal.fire({
                title: "¡Excelente!",
                text: "Se guardó correctamente",
                icon: "success"
            });
            limpiarFormularioUsuario();
        },
        error: function (error) {
            Swal.fire({
                title: "Error",
                text: "Error al guardar el Usuario",
                icon: "error"
            });
        }
    });
}

// Función para limpiar el formulario
function limpiarFormularioUsuario() {
    document.getElementById("nombre").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("tipoUsuario").value = "";
}