var url = "http://localhost:8080/api/v1/libro/";

// Función para listar los libros

function crearBoton(clase, innerHTML, onClick) {
    var boton = document.createElement("button");
    boton.className = clase;
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
                var celdaISBN = document.createElement("td");
                var celdaGenero = document.createElement("td");
                var celdanumEjemdisponibles = document.createElement("td");
                var celdanumEjemocupados = document.createElement("td");
                var celdaOpciones = document.createElement("td");

                // Asignar valores a las celdas
                celdaId.innerText = libro.idLibro;
                celdaTitulo.innerText = libro.titulo;
                celdaAutor.innerText = libro.autor;
                celdaISBN.innerText = libro.ISBN;
                celdaGenero.innerText = libro.genero;
                celdanumEjemdisponibles.innerText = libro.numEjemdisponibles;
                celdanumEjemocupados.innerText = libro.numEjemocupados;

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
           var btnEditar = crearBoton("btn editar", '<i class="fas fa-edit"></i>', function() {
            
            mostrarFormularioEdicion(libro);
        });
        
        /// Obtener el modal y el botón de cerrar
        var modal = document.getElementById("editModal");
        var span = document.getElementsByClassName("close")[0];
        
        // Función para mostrar el formulario de edición con la información actual del libro
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
        
        // Función para cerrar el modal cuando se hace clic en la 'x'
        span.onclick = function() {
            modal.style.display = "none";
        }
        
        // Función para cerrar el modal cuando se hace clic fuera del contenido del modal
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        
        // Función para editar un libro
        function editarLibro(idLibro) {
            var titulo = document.getElementById("edittitulo").value;
            var autor = document.getElementById("editautor").value;
            var genero = document.getElementById("editgenero").value;
            var ISBN = document.getElementById("editISBN").value;
            var numEjemdisponibles = document.getElementById("editnumEjemdisponibles").value;
            var numEjemocupados = document.getElementById("numEjemocupados").value;
        
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
                    $('#modalLibro').modal('hide');
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
         // Asignar la función de guardado al botón de guardar
            document.getElementById("btnGuardar").onclick = function() {
                let idLibro = document.getElementById("editId").value;
                Swal.fire({
                    title: '¿Estás seguro de actualizar este libro?',
                    text: "No se puede revertir",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí'
                }).then((result) => {
                    if (result.isConfirmed) {
                        editarLibro();
                    }
                });
            };
                   
                
    }
        
                // Añadir botones a la celda de opciones
                celdaOpciones.appendChild(btnEditar);
                celdaOpciones.appendChild(btnEliminar);

                // Añadir celdas al registro
                trRegistro.appendChild(celdaId);
                trRegistro.appendChild(celdaTitulo);
                trRegistro.appendChild(celdaAutor);
                trRegistro.appendChild(celdaISBN);
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
        data: formData,
        success: function (result) {
            Swal.fire({
                title: "¡Excelente!",
                text: "Se guardó correctamente",
                icon: "success"
            });
            limpiarFormulario();
        },
        error: function (error) {
            Swal.fire({
                title: "Error",
                text: "Error al guardar el libro",
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
// 
// document.addEventListener("DOMContentLoaded", function() {
//     listaLibro();
    
//     document.getElementById("btnGuardar").onclick = function() {
//         let idLibro = document.getElementById("editId").value;
//         Swal.fire({
//             title: '¿Estás seguro de actualizar este libro?',
//             text: "No se puede revertir",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Sí'
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 editarLibro();
//             }
//         });
//     };
// });