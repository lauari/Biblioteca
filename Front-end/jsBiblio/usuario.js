var url = "http://localhost:8080/api/v1/usuario/";


// Función para listar los usuarios

function crearBoton(clase, innerHTML, onClick) {
    var boton = document.createElement("button");
    boton.className = clase;
    boton.innerHTML = innerHTML;
    boton.onclick = onClick;
    return boton;
}

// Función para listar los usuarios desde el servidor
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
                var celdaDireccion = document.createElement("td");
                var celdaCorreo = document.createElement("td");
                var celdaTipoUsuario = document.createElement("td");
                var celdaOpciones = document.createElement("td");
                

                // Asignar valores a las celdas
                celdaId.innerText = usuario.idUsuario;
                celdaNombre.innerText = usuario.nombre;
                celdaDireccion.innerText = usuario.direccion;
                celdaCorreo.innerText = usuario.correo;
                celdaTipoUsuario.innerText = usuario.tipoUsuario;

                // Botón eliminar
                var btnEliminar = crearBoton("btn eliminar", '<i class="fas fa-trash-alt"></i>', function() {
                    Swal.fire({
                        title: '¿Estás seguro de eliminar este libro?',
                        text: "No se puede revertir",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Sí, eliminar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            eliminarLibro(usuario.idUsuario);
                        }
                    });
                });

                // Botón editar
                var btnEditar = crearBoton("btn editar", '<i class="fas fa-edit"></i>', function() {
                    listaUsuario(usuario);
                });


                // Añadir botones a la celda de opciones
                celdaOpciones.appendChild(btnEditar);
                celdaOpciones.appendChild(btnEliminar);

                // Añadir celdas al registro
                trRegistro.appendChild(celdaId);
                trRegistro.appendChild(celdaNombre);
                trRegistro.appendChild(celdaDireccion);
                trRegistro.appendChild(celdaCorreo);
                trRegistro.appendChild(celdaTipoUsuario);
                trRegistro.appendChild(celdaOpciones);

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

// Función para eliminar un Usuario por su ID
function eliminarUsuario(idUsuario) {
    $.ajax({
        url: url + idUsuario,
        type: "DELETE",
        success: function (result) {
            Swal.fire({
                title: "¡Eliminado!",
                text: "El usuario ha sido eliminado.",
                icon: "success"
            });
            listaUsuario(); // Actualizar la lista después de eliminar
        },
        error: function (error) {
            Swal.fire({
                title: "Error",
                text: "Error al eliminar el usuario",
                icon: "error"
            });
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
        "tipoUsuario": tipoUsuario,
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
                text: "Error al guardar el usuario",
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