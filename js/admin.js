//traer usuario logueado
let usuario = JSON.parse(localStorage.getItem("usuario")) || null;

// Traemos todos los usuarios registrados
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

let contenidoTabla = document.querySelector("#cuerpoTabla");

let form = document.querySelector("#formulario");

//capturamos el modal que usamos para mostrar el usuario logueado.
let myModalUser = new bootstrap.Modal(document.getElementById("usuarioModal"), {
  keyboard: false,
});

// Capturamos el modal para modificar a los usuarios de la tabla
const myModal = new bootstrap.Modal("#updateModal", {
  keyboard: false,
});

let indiceUser = null;

// Verificamos si el usuario esta logueado
const usuarioRegistrado = function name() {
  if (!usuario) {
    return false;
  } else {
    return true;
  }
};

// Modificamos el navbar segun si el usuario esta logueado o no.
const modificarNavbar = function () {
  if (usuarioRegistrado()) {
    let contenedorBotones = document.querySelector("#contenedor_botones");

    let estructuraNavbar = `
  <div class="dropdown">
        <a
          class="dropdown-toggle text-white text-decoration-none"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="../images/avatares/${usuario.avatar}.jpg"
            alt="avatar"
            id="avatar"
          />
        </a>

        <ul class="dropdown-menu dropdown-menu-end dropdown-menu-dark">
          <li><a class="dropdown-item" href="#" id="verUsuario">Perfil</a></li>
          ${
            usuario.rol === "admin_rol"
              ? '<li><a class="dropdown-item" href="#">Administracion</a></li>'
              : '<li><a class="dropdown-item" href="#">My lista</a></li>'
          }
        </ul>
  </div>
  `;
    contenedorBotones.innerHTML = estructuraNavbar;
  }
};
modificarNavbar();

if (!usuario || usuario.rol === "user_rol") {
  let contenedorMain = document.querySelector("#contenedor");

  let mensaje = `
<h3 class="text-center">No tienes los permisos necesarios para estar aquí</h3>
`;
  contenedorMain.innerHTML = mensaje;
}

const CargarInfoModalUser = function () {
  if (usuarioRegistrado()) {
    let contenedorModal = document.querySelector("#card_avatar");

    let estructuraAvatar = `
            <div class="card border-0 text-center" style="max-width: 540px">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img
                      src="../images/avatares/${usuario.avatar}.jpg"
                      class="img-fluid"
                      id="avatarModal"
                      alt="avatar"
                    />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${usuario.username}</h5>
                      <p class="card-text">
                        ${usuario.email}
                      </p>
                      <p class="card-text">
                      <b>Rol:</b>
                        ${usuario.rol}
                      </p>
                    </div>
                  </div>
                </div>
             </div>
  `;
    contenedorModal.innerHTML = estructuraAvatar;
  }
};
CargarInfoModalUser();
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

//Deslogueo de la pagina
document.querySelector("#logout").addEventListener("click", function () {
  localStorage.removeItem("usuario");
  location.href = "../pages/login.html";
});

//Si hacemos click en el boton para ver perfil
document.querySelector("#verUsuario").addEventListener("click", function () {
  myModalUser.show();
});
