(function() {
    var style = document.createElement('style');
    style.innerHTML = `
        .celda-opciones {
            display: flex;
            gap: 0; /* No hay espacio entre los botones */
        }
        .btn {
            border: none;
            padding: 5px 10px;
            font-size: 16px;
            cursor: pointer;
            margin: 0; /* Sin margen entre botones */
        }
        .btn-eliminar {
            background-color: ;
            color: black;
        }
        .btn-eliminar:hover {
            background-color:;
        }
        .btn-editar {
            background-color: ;
            color: black;
        }
        .btn-editar:hover {
            background-color:;
        }
        .btn-detalles {
            background-color:;
            color: black;
        }
        .btn-detalles:hover {
            background-color:;
        }
    `;
    document.head.appendChild(style);
})();

var url = "http://localhost:8080/api/v1/prestamo/";
var urllibro = "http://localhost:8080/api/v1/libro/";
var urlusuario = "http://localhost:8080/api/v1/usuario/";

function crearBoton(clase, innerHTML, onClick) {
    var boton = document.createElement("button");
    boton.className = clase;
    boton.innerHTML = innerHTML;
    boton.onclick = onClick;
    return boton;
}

document.getElementById('fechaPrestamo').addEventListener('change', function() {
    const fechaPrestamo = new Date(this.value);
    const fechaDevolucion = new Date(fechaPrestamo);
    fechaDevolucion.setMonth(fechaDevolucion.getMonth() + 1);

    const fechaDevolucionInput = document.getElementById('fechaDevolucion');
    fechaDevolucionInput.setAttribute('min', this.value); // Establece el valor mínimo
    fechaDevolucionInput.setAttribute('value', fechaDevolucion.toISOString().split('T')[0]); // Establece el valor por defecto
});

function listaPrestamo() {
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            console.log(result);
            var cuerpoTablaP = document.getElementById("cuerpoTablaP");
            cuerpoTablaP.innerHTML = "";

            result.forEach(function (prestamo) {
                var trRegistro = document.createElement("tr");

                // Crear celdas y añadir los datos
                var celdaId = document.createElement("td");
                var celdaFechaPrestamo = document.createElement("td");
                var celdaFechaDevolucion = document.createElement("td");
                var celdaUsuario = document.createElement("td");
                var celdaLibro = document.createElement("td");
                var celdaEstado = document.createElement("td");
                var celdaOpciones = document.createElement("td");

                 // Asignar la clase CSS a la celda de opciones
                 celdaOpciones.className = "celda-opciones";

                // Asignar valores a las celdas
                celdaId.innerText = prestamo.idPrestamo;
                celdaFechaPrestamo.innerText = prestamo.fechaPrestamo;
                celdaFechaDevolucion.innerText = prestamo.fechaDevolucion;
                celdaUsuario.innerText = prestamo.usuario.nombre;
                celdaLibro.innerText = prestamo.libro.titulo;
                celdaEstado.innerText = prestamo.estado;

                // Botón detalles
 var btnDetalles = crearBoton("btn detalles", '<i class="fas fa-info-circle"></i>', function() {
    mostrarDetalles(prestamo);
});

 // Función para mostrar los detalles del libro
 function mostrarDetalles(prestamo) {
    Swal.fire({
        title: 'Detalles del prestamo',
        html: `
            <p><strong>ID:</strong> ${prestamo.idPrestamo}</p>
            <p><strong>	Fecha de préstamo:</strong> ${prestamo.fechaPrestamo}</p>
            <p><strong>Fecha de devolucion:</strong> ${prestamo.fechaDevolucion}</p>
            <p><strong>Usuario que realiza el prestamo:</strong> ${prestamo.usuario.nombre}</p>
            <p><strong>Libro prestado:</strong> ${prestamo.libro.titulo}</p>
            <p><strong>Estado:</strong> ${prestamo.estado}</p>
        `,
        icon: 'info',
        confirmButtonText: 'Cerrar'
    });
}

                // Botón eliminar
                var btnEliminar = crearBoton("btn eliminar", '<i class="fas fa-trash-alt"></i>', function() {
                    Swal.fire({
                        title: '¿Estás seguro de eliminar este préstamo?',
                        text: "No se puede revertir",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Sí, eliminar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            eliminarPrestamo(prestamo.idPrestamo);
                        }
                    });
                });

                // Añadir botones a la celda de opciones
                celdaOpciones.appendChild(btnEliminar);
                celdaOpciones.appendChild(btnDetalles);

                // Añadir celdas al registro
                trRegistro.appendChild(celdaId);
                trRegistro.appendChild(celdaFechaPrestamo);
                trRegistro.appendChild(celdaFechaDevolucion);
                trRegistro.appendChild(celdaUsuario);
                trRegistro.appendChild(celdaLibro);
                trRegistro.appendChild(celdaEstado);
                trRegistro.appendChild(celdaOpciones);

                // Añadir el registro a la tabla
                cuerpoTablaP.appendChild(trRegistro);
            });
        },
        error: function (error) {
            console.error("Error en la petición:", error);
            alert("Error en la petición: " + error.statusText);
        }
    });
}

 

// Función para eliminar un préstamo por su ID
function eliminarPrestamo(idPrestamo) {
    $.ajax({
        url: url + idPrestamo,
        type: "DELETE",
        success: function (result) {
            Swal.fire({
                title: "¡Eliminado!",
                text: "El préstamo ha sido eliminado.",
                icon: "success"
            });
            listaPrestamo(); // Actualizar la lista después de eliminar
        },
        error: function (error) {
            Swal.fire({
                title: "Error",
                text: "Error al eliminar el préstamo",
                icon: "error"
            });
        }
    });
}

// Función para listar libros
function cargarLibros() {
    var libro = document.getElementById("libro");

    if (libro) {
        // Limpiar las opciones actuales
        libro.innerHTML = "";

        $.ajax({
            url: urllibro,
            type: "GET",
            success: function (result) {
                for (var i = 0; i < result.length; i++) {
                    var option = document.createElement("option");
                    option.value = result[i].idLibro;
                    option.text = result[i].titulo;
                    libro.appendChild(option);
                }
            },
            error: function (error) {
                console.error("Error al obtener la lista de libros: " + error);
            }
        });
    } else {
        console.error("Elemento con ID 'libro' no encontrado.");
    }
}

// Función para listar usuarios
function cargarUsuarios() {
    var usuario = document.getElementById("usuario");

    if (usuario) {
        // Limpiar las opciones actuales
        usuario.innerHTML = "";

        $.ajax({
            url: urlusuario,
            type: "GET",
            success: function (result) {
                for (var i = 0; i < result.length; i++) {
                    var option = document.createElement("option");
                    option.value = result[i].idUsuario;
                    option.text = result[i].nombre;
                    usuario.appendChild(option);
                }
            },
            error: function (error) {
                console.error("Error al obtener la lista de usuarios: " + error);
            }
        });
    } else {
        console.error("Elemento con ID 'usuario' no encontrado.");
    }
}

// Función para agregar un préstamo
function agregarPrestamo() {
    let fechaPrestamo = document.getElementById("fechaPrestamo").value;
    let fechaDevolucion = document.getElementById("fechaDevolucion").value;
    let usuario = document.getElementById("usuario").value;
    let libro = document.getElementById("libro").value;
    let estado = document.getElementById("estado").value;

    let formData = {
        "fechaPrestamo": fechaPrestamo,
        "fechaDevolucion": fechaDevolucion,
        "usuario": usuario,
        "libro": libro,
        "estado": estado,
    };

    $.ajax({
        url: url,
        type: "POST",
        data: formData,
        success: function (result) {
            Swal.fire({
                title: "¡Excelente!",
                text: "Préstamo registrado correctamente",
                icon: "success"
            });
            limpiarFormulario();
        },
        error: function (error) {
            console.error("Error al registrar el préstamo:");
            // Mostrar mensaje de error detallado
            Swal.fire({
                title: "Error",
                text: "Error al registrar el préstamo: ",
                icon: "error"
            });
        }
    });

}

// Función para limpiar el formulario
function limpiarFormulario() {
    document.getElementById("fechaPrestamo").value = "";
    document.getElementById("fechaDevolucion").value = "";
    document.getElementById("usuario").value = "";
    document.getElementById("libro").value = "";
    document.getElementById("estado").value = "";
}

// Cargar libros y usuarios al cargar la página
window.onload = function() {
    cargarLibros();
    cargarUsuarios();
    listaPrestamo();
}
