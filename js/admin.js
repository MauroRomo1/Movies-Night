//traer usuario logueado
let usuario = JSON.parse(localStorage.getItem("usuario")) || null;

// Traemos todos los usuarios registrados
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

let contenidoTabla = document.querySelector("#cuerpoTabla");

let form = document.querySelector("#formulario");

const myModal = new bootstrap.Modal("#updateModal", {
  keyboard: false,
});

// info admin logueado
let adminContenedor = document.querySelector("#contendorAdminCard");

let adminCard = `
            <div class="card mb-3" style="max-width: 540px">
              <div class="row g-0">
                <div class="col-md-4">
                  <img
                    src="../images/avatares/${usuario.avatar}.jpg"
                    class="img-fluid"
                    alt="${usuario.username}"
                  />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">${usuario.username}</h5>
                    <p class="card-text">
                      ${usuario.email}
                    </p>
                    <p class="card-text">
                      <small class="text-muted">${usuario.rol}</small>
                    </p>
                    <button id="volverInicio" class="btn btn-primary">Volver al inicio</button>
                    <button id="logout" class="btn btn-secondary">Cerrar sesión</button>
                  </div>
                </div>
              </div>
            </div>
  `;
adminContenedor.innerHTML = adminCard;

let indiceUser = null;

// Abrir modal
const abrirModal = function (indice) {
  myModal.show();
  cargarDatosUser(indice);
};

const cargarTabla = function () {
  contenidoTabla.innerHTML = "";

  usuarios.map(function (user, index) {
    let fila = document.createElement("tr");
    let estructura = `
            <td>${user.nombre}</td>
            <td>${user.apellido}</td>
            <td>${user.email}</td>
            <td>${user.username}</td>
            <td>${user.rol}</td>
            <td>
            <img 
            id="avatar" 
            src="../images/avatares/${user.imagen}.jpg" 
            alt=${user.nombre} />
            </td>
            <td>
            ${user.activo === true ? "Activo" : "Desactivado"}
            </td>
            <td>
            <i class="fa fa-pencil-square-o fa-2x text-info m-2" aria-hidden="true" role="button" onclick="abrirModal(${index})"></i>
            </td>
            <td>
            <i class="fa fa-trash-o fa-2x text-danger m-2" aria-hidden="true" role="button" onclick="borrarUsuario(${index})"></i>
            </td>
        `;

    fila.innerHTML = estructura;
    contenidoTabla.appendChild(fila);
  });
};

// Funcion para cargar los datos en el modal de editar usuario
const cargarDatosUser = function (indice) {
  indiceUser = indice;
  let datos = `
            <div class="mb-2 img_modal_avatar text-center">
                <img  src="../images/avatares/${usuarios[indice].imagen}.jpg" alt=${usuarios[indice].nombre} id="avatarModalAdmin" />
                </div>
                <div class="mb-2">
                <label><b>Correo electrónico</b></label>
                  <input type="email" class="form-control" id="email" value=${usuarios[indice].email} required>
                </div>
                <div class="mb-2">
                <label><b>Nombre</b></label>
                  <input type="text" class="form-control" id="nombre" value=${usuarios[indice].nombre} required>
                </div>
                <div class="mb-2">
                <label><b>Apellido</b></label>
                  <input type="text" class="form-control" id="apellido" value=${usuarios[indice].apellido} required>
                </div>
                <div class="mb-2">
                <label><b>Username</b></label>
                  <input type="text" class="form-control" id="username"  value=${usuarios[indice].username} required>
                </div>
                <div class="mb-2">
                <label><b>Rol</b></label>
                  <input type="text" class="form-control" id="rol"  value=${usuarios[indice].rol} required>
                </div>
                <div class="mb-2">
                <label for="avatarUsuario"><b>Cambiar avatar</b></label>
                  <select class="form-select" id="avatarUsuario">
                    <option selected disabled value=${usuarios[indice].imagen}>Avatar actual</option>
                    <option value="avatar1">Avatar de conejo</option>
                    <option value="avatar2">Avatar de gato</option>
                    <option value="avatar3">Avatar de toro</option>
                    <option value="avatar4">Avatar de vaca</option>
                  </select>
                  <div class="invalid-feedback">
                    Seleccione el avatar nuevo
                  </div>
                </div>
                <div class="d-grid mt-3">
                  <button class="btn btn-primary" type="submit">Actualizar</button>
                </div>
  `;
  form.innerHTML = datos;
};

// Funcion que acutualiza el usuario selecionado con los datos nuevos
const updateUsuario = function (e) {
  e.preventDefault();
  usuarios[indiceUser].nombre = document.querySelector("#nombre").value;
  usuarios[indiceUser].apellido = document.querySelector("#apellido").value;
  usuarios[indiceUser].email = document.querySelector("#email").value;
  usuarios[indiceUser].username = document.querySelector("#username").value;
  usuarios[indiceUser].rol = document.querySelector("#rol").value;
  usuarios[indiceUser].imagen = document.querySelector("#avatarUsuario").value;

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  cargarTabla();
  myModal.hide();
};

cargarTabla();

document.querySelector("#logout").addEventListener("click", function () {
  localStorage.removeItem("usuario");
  location.href = "../pages/login.html";
});

document.querySelector("#volverInicio").addEventListener("click", function () {
  location.href = "../index.html";
});
