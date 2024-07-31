// Inserta el CSS directamente en el documento
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

var url = "http://localhost:8080/api/v1/libro/";

// Función para crear un botón
function crearBoton(clase, innerHTML, onClick) {
    var boton = document.createElement("button");
    boton.className = "btn " + clase;
    boton.innerHTML = innerHTML;
    boton.onclick = onClick;
    return boton;
}

// Función para listar los libros desde el servidor
function listaLibro() {
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            console.log(result);
            var cuerpoTabla = document.getElementById("cuerpoTabla");
            cuerpoTabla.innerHTML = "";

            result.forEach(function (libro) {
                var trRegistro = document.createElement("tr");

                // Crear celdas y añadir los datos
                var celdaId = document.createElement("td");
                var celdaTitulo = document.createElement("td");
                var celdaAutor = document.createElement("td");
                var celdaIsbn = document.createElement("td");
                var celdaGenero = document.createElement("td");
                var celdanumEjemdisponibles = document.createElement("td");
                var celdanumEjemocupados = document.createElement("td");
                var celdaOpciones = document.createElement("td");

                // Asignar la clase CSS a la celda de opciones
                celdaOpciones.className = "celda-opciones";

                // Asignar valores a las celdas
                celdaId.innerText = libro.idLibro;
                celdaTitulo.innerText = libro.titulo;
                celdaAutor.innerText = libro.autor;
                celdaIsbn.innerText = libro.isbn;
                celdaGenero.innerText = libro.genero;
                celdanumEjemdisponibles.innerText = libro.numEjemdisponibles;
                celdanumEjemocupados.innerText = libro.numEjemocupados;

                // Botón detalles
                var btnDetalles = crearBoton("btn-detalles", '<i class="fas fa-info-circle"></i>', function() {
                    mostrarDetalles(libro);
                });

                // Botón eliminar
                var btnEliminar = crearBoton("btn-eliminar", '<i class="fas fa-trash-alt"></i>', function() {
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
                            eliminarLibro(libro.idLibro);
                        }
                    });
                });

                // Función para eliminar un libro por su ID
                function eliminarLibro(idLibro) {
                    $.ajax({
                        url: url + idLibro,
                        type: "DELETE",
                        success: function (result) {
                            Swal.fire({
                                title: "¡Eliminado!",
                                text: "El libro ha sido eliminado.",
                                icon: "success"
                            });
                            listaLibro(); // Actualizar la lista después de eliminar
                        },
                        error: function (error) {
                            Swal.fire({
                                title: "Error",
                                text: "Error al eliminar el libro",
                                icon: "error"
                            });
                        }
                    });
                }

                // Botón editar
                var btnEditar = crearBoton("btn-editar", '<i class="fas fa-edit"></i>', function() {
                    mostrarFormularioEdicion(libro);
                });

                // Obtener el modal y el botón de cerrar
                var modal = document.getElementById("editModal");

                function mostrarFormularioEdicion(libro) {
                    // Asignar los valores actuales del libro a los campos del formulario
                    document.getElementById("titulo").value = libro.titulo;
                    document.getElementById("autor").value = libro.autor;
                    document.getElementById("genero").value = libro.genero;
                    document.getElementById("ISBN").value = libro.ISBN;
                    document.getElementById("numEjemdisponibles").value = libro.numEjemdisponibles;
                    document.getElementById("numEjemocupados").value = libro.numEjemocupados;

                    // Mostrar el modal de edición
                    modal.style.display = "block";
                }

                function editarLibro(idLibro) {
                    var titulo = document.getElementById("editTitulo").value;
                    var autor = document.getElementById("editAutor").value;
                    var genero = document.getElementById("editGenero").value;
                    var ISBN = document.getElementById("editISBN").value;
                    var numEjemdisponibles = document.getElementById("editNumEjemdisponibles").value;
                    var numEjemocupados = document.getElementById("editNumEjemocupados").value;

                    var formData = {
                        "titulo": titulo,
                        "autor": autor,
                        "genero": genero,
                        "ISBN": ISBN,
                        "numEjemdisponibles": numEjemdisponibles,
                        "numEjemocupados": numEjemocupados
                    };

                    $.ajax({
                        url: url + idLibro,
                        type: "PUT",
                        data: JSON.stringify(formData),
                        contentType: "application/json",
                        success: function (result) {
                            Swal.fire({
                                title: "¡Actualizado!",
                                text: "El libro ha sido actualizado correctamente.",
                                icon: "success"
                            });
                            modal.style.display = "none"; // Cerrar el modal después de la actualización
                            listaLibro();
                        },
                        error: function (error) {
                            console.error("Error al actualizar el libro:", error);
                            Swal.fire({
                                title: "Error",
                                text: "Ocurrió un error al actualizar el libro. Por favor, inténtelo de nuevo.",
                                icon: "error"
                            });
                        }
                    });
                }

                // Función para mostrar los detalles del libro
                function mostrarDetalles(libro) {
                    Swal.fire({
                        title: 'Detalles del Libro',
                        html: `
                            <p><strong>ID:</strong> ${libro.idLibro}</p>
                            <p><strong>Título:</strong> ${libro.titulo}</p>
                            <p><strong>Autor:</strong> ${libro.autor}</p>
                            <p><strong>ISBN:</strong> ${libro.isbn}</p>
                            <p><strong>Género:</strong> ${libro.genero}</p>
                            <p><strong>Ejemplares Disponibles:</strong> ${libro.numEjemdisponibles}</p>
                            <p><strong>Ejemplares Ocupados:</strong> ${libro.numEjemocupados}</p>
                        `,
                        icon: 'info',
                        confirmButtonText: 'Cerrar'
                    });
                }

                // Añadir botones a la celda de opciones
                celdaOpciones.appendChild(btnDetalles);
                celdaOpciones.appendChild(btnEditar);
                celdaOpciones.appendChild(btnEliminar);

                // Añadir celdas al registro
                trRegistro.appendChild(celdaId);
                trRegistro.appendChild(celdaTitulo);
                trRegistro.appendChild(celdaAutor);
                trRegistro.appendChild(celdaIsbn);
                trRegistro.appendChild(celdaGenero);
                trRegistro.appendChild(celdanumEjemdisponibles);
                trRegistro.appendChild(celdanumEjemocupados);
                trRegistro.appendChild(celdaOpciones);

                // Añadir el registro a la tabla
                cuerpoTabla.appendChild(trRegistro);
            });
        },
        error: function (error) {
            console.error("Error en la petición:", error);
            alert("Error en la petición: " + error.statusText);
        }
    });
}

// Función para agregar un libro
function agregarLibro() {
    let titulo = document.getElementById("titulo").value;
    let autor = document.getElementById("autor").value;
    let genero = document.getElementById("genero").value;
    let ISBN = document.getElementById("ISBN").value;
    let numEjemdisponibles = document.getElementById("numEjemdisponibles").value;
    let numEjemocupados = document.getElementById("numEjemocupados").value;

    // Datos del formulario
    let formData = {
        "titulo": titulo,
        "autor": autor,
        "genero": genero,
        "ISBN": ISBN,
        "numEjemdisponibles": numEjemdisponibles,
        "numEjemocupados": numEjemocupados
    };

    $.ajax({
        url: url,
        type: "POST",
        data: formData, // Asegúrate de enviar los datos en formato JSO
        success: function (result) {
            Swal.fire({
                title: "¡Excelente!",
                text: "Se guardó correctamente",
                icon: "success"
            });
            limpiarFormulario();
            listaLibro(); // Actualizar la lista después de agregar
        },
        error: function (error) {
            Swal.fire({
                title: "Error",
                text: "Error al agregar el libro",
                icon: "error"
            });
        }
    });
}

// Función para limpiar el formulario
function limpiarFormulario() {
    document.getElementById("titulo").value = "";
    document.getElementById("autor").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("ISBN").value = "";
    document.getElementById("numEjemdisponibles").value = "";
    document.getElementById("numEjemocupados").value = "";
}
