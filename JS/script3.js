// Función para gestionar el usuario (guardar o actualizar)
function gestionarUsuario() {
    const usuario = {
        cedula: document.getElementById('nroUsuario').value,
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        telefono: document.getElementById('telefono').value,
        correo: document.getElementById('correo').value,
        direccion: document.getElementById('direccion').value,
        fechaNacimiento: document.getElementById('fechaNacimiento').value
    };

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const index = usuarios.findIndex(u => u.cedula === usuario.cedula || u.correo === usuario.correo);
    if (index !== -1) {
        usuarios[index] = usuario;
    } else {
        usuarios.push(usuario);
    }

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    document.getElementById('userForm').reset();
    $('#userModal').modal('hide');
    mostrarUsuarios();
}

// Función para mostrar usuarios en la tabla
function mostrarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const userTable = document.getElementById('userTable');
    userTable.innerHTML = '';

    usuarios.forEach(usuario => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${usuario.cedula}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.apellido}</td>
            <td>${usuario.telefono}</td>
            <td>${usuario.correo}</td>
            <td>${usuario.direccion}</td>
            <td>${usuario.fechaNacimiento}</td>
            <td>
                <div class="btn-container">
                    <button class="btn btn-info btn-sm" onclick="verDetalles('${usuario.cedula}')">Ver</button>
                    <button class="btn btn-warning btn-sm" onclick="editarUsuario('${usuario.cedula}')">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarUsuario('${usuario.cedula}')">Eliminar</button>
                </div>
            </td>
        `;
        userTable.appendChild(row);
    });
}

// Función para ver los detalles del usuario en un modal
function verDetalles(cedula) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(u => u.cedula === cedula);

    document.getElementById('viewNroUsuario').value = usuario.cedula;
    document.getElementById('viewNombre').value = usuario.nombre;
    document.getElementById('viewApellido').value = usuario.apellido;
    document.getElementById('viewTelefono').value = usuario.telefono;
    document.getElementById('viewCorreo').value = usuario.correo;
    document.getElementById('viewDireccion').value = usuario.direccion;
    document.getElementById('viewFechaNacimiento').value = usuario.fechaNacimiento;

    $('#viewUserModal').modal('show');
}

// Función para eliminar un usuario
function eliminarUsuario(cedula) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios = usuarios.filter(usuario => usuario.cedula !== cedula);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    mostrarUsuarios();
}

// Función para editar un usuario
function editarUsuario(cedula) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(u => u.cedula === cedula);

    document.getElementById('nroUsuario').value = usuario.cedula;
    document.getElementById('nombre').value = usuario.nombre;
    document.getElementById('apellido').value = usuario.apellido;
    document.getElementById('telefono').value = usuario.telefono;
    document.getElementById('correo').value = usuario.correo;
    document.getElementById('direccion').value = usuario.direccion;
    document.getElementById('fechaNacimiento').value = usuario.fechaNacimiento;

    document.getElementById('saveButton').onclick = function() {
        gestionarUsuario();
    };

    $('#userModal').modal('show');
}

// Función para limpiar el formulario de nuevo usuario
function limpiarFormulario() {
    document.getElementById('userForm').reset();
    $('#userModal').modal('hide');
}

// Función para cerrar el modal de "Detalles" y limpiar formulario de registro si es necesario
function cerrarVistaDetalles() {
    document.getElementById('viewUserForm').reset();
    $('#viewUserModal').modal('hide');
}

// Función de registro de usuario
function RegistroUsuario() {
    const user = {
        nombre: document.getElementById("nombre").value,
        usuario: document.getElementById("email").value,
        password: document.getElementById("password").value,
    };

    localStorage.setItem('user', JSON.stringify(user));
    window.location.href = '../RegistrosWithJavaScript/index.html';
}

// Verificar si el usuario está logueado y mostrar su nombre
window.onload = function() {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

    if (usuarioLogueado) {
        document.getElementById("sessionInfo").style.display = "flex";
        document.getElementById("usernameDisplay").innerText = `Inicio Sesión El Usuario: ${usuarioLogueado.nombre}`;
    } else {
        document.getElementById("sessionInfo").style.display = "none";
    }

    mostrarUsuarios();
};

// Función para cerrar sesión 
function cerrarSesion() {
    localStorage.removeItem("usuarioLogueado");
    window.location.href = "../RegistrosWithJavaScript/index.html";
}
