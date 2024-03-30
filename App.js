$(document).ready(function () {
    var data = [];

    function actualizarTabla() {
        var tabla = $("#lista tbody");
        tabla.empty();

        for (var i = 0; i < data.length; i++) {
            var producto = data[i];
            var fila = `<tr data-index="${i}">
                 <td>${i + 1}</td> 
                <td>${producto.Categoria}</td>
                <td>${producto.Nombre}</td>
                <td>${producto.Precio}</td>
                <td>${producto.Descripcion}</td>
                <td>${producto.Imagen}</td>
                <td>
                    <button class="btn btn-primary btn-editar"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="btn btn-danger btn-eliminar"><i class="fa-solid fa-trash-can"></i></button>
                </td>
            </tr>`;

            tabla.append(fila);
        }
    }

    $("#ImagenInput").change(function () {
        var fileInput = $(this)[0];

        if (fileInput.files && fileInput.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $("#ImagenPreview").attr("src", e.target.result);
            };

            reader.readAsDataURL(fileInput.files[0]);
        }
    });

    $("#SeleccionarImagen").click(function () {
        $("#ImagenInput").click();
    });

    $("#agregarEditar").click(function () {
        var id = $("#ID").val();
        var categoria = $("#Categoria").val();
        var nombre = $("#Nombre").val();
        var precio = $("#Precio").val();
        var descripcion = $("#Descripcion").val();

        // Obtener la información de la imagen
        var imagenInput = document.getElementById("ImagenInput");
        var imagen = imagenInput.files.length > 0 ? URL.createObjectURL(imagenInput.files[0]) : '';

        var editIndex = $("#editIndex").val();

        if (editIndex === "") {
            // Agregar nuevo producto
            data.push({
                ID: data.length + 1,
                Categoria: categoria,
                Nombre: nombre,
                Precio: precio,
                Imagen: imagen,
                Descripcion: descripcion
            });
        } else {
            // Se edita un producto que ya existe
            data[editIndex].Categoria = categoria;
            data[editIndex].Nombre = nombre;
            data[editIndex].Precio = precio;
            data[editIndex].Imagen = imagen;
            data[editIndex].Descripcion = descripcion;
            $("#editIndex").val("");
        }

        // Limpiar formulario
        $("#ID").val("");
        $("#Categoria").val("");
        $("#Nombre").val("");
        $("#Precio").val("");
        $("#Imagen").val("");
        $("#Descripcion").val("");
        $("#ImagenPreview").attr("src", "");

        // Actualizar la tabla
        actualizarTabla();
    });

    $("#lista").on("click", ".btn-editar", function () {
        var index = $(this).closest("tr").data("index");

        // Llenar el formulario con los datos de la fila seleccionada
        var producto = data[index];
        $("#ID").val(producto.ID);
        $("#Categoria").val(producto.Categoria);
        $("#Nombre").val(producto.Nombre);
        $("#Precio").val(producto.Precio);
        $("#Descripcion").val(producto.Descripcion);

        // Actualizar la vista previa de la imagen
        var imagenInput = document.getElementById("ImagenInput");
        var imagenURL = producto.Imagen;
        if (imagenURL) {
            $("#ImagenPreview").attr("src", imagenURL);
        } else {
            $("#ImagenPreview").attr("src", "");
        }

        // Guardar el índice para saber que estamos editando
        $("#editIndex").val(index);
    });

    $("#lista").on("click", ".btn-eliminar", function () {
        var index = $(this).closest("tr").data("index");
        data.splice(index, 1);

        // Recalcular los IDs
        for (var i = index; i < data.length; i++) {
            data[i].ID = i + 1;
        }

        // Limpiar formulario
        $("#ID").val("");
        $("#Categoria").val("");
        $("#Nombre").val("");
        $("#Precio").val("");
        $("#Imagen").val("");
        $("#Descripcion").val("");
        actualizarTabla();
    });

});
