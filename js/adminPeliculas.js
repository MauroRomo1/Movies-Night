// Clase para crear las peliculas
class Pelicula {
  constructor(
    id,
    imagen,
    imgBanner,
    nombre,
    categoria,
    descripcion,
    publicado = false
  ) {
    this.id = id;
    this.imagen = imagen;
    this.imgBanner = imgBanner;
    this.nombre = nombre;
    this.categoria = categoria;
    this.descripcion = descripcion;
    this.publicado = publicado;
  }
}

//traer usuario logueado
let usuario = JSON.parse(localStorage.getItem("usuario")) || null;

// Peliculas
let peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];

//capturamos el modal que usamos para mostrar el usuario logueado.
let myModalUser = new bootstrap.Modal(document.getElementById("usuarioModal"), {
  keyboard: false,
});

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

// Si el usuario tiene como rol "Usuario" se le renderiza un titulo de que no tiene permisos de estar en la pagina
if (!usuario || usuario.rol === "user_rol") {
  let contenedorMain = document.querySelector("#contenedor");

  let mensaje = `
  <h3 class="text-center">No tienes los permisos necesarios para estar aquí</h3>
  `;
  contenedorMain.innerHTML = mensaje;
}

// Cargamos la info en el modal de usuario logueado
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

//Deslogueo de la pagina
document.querySelector("#logout").addEventListener("click", function () {
  localStorage.removeItem("usuario");
  location.href = "../pages/login.html";
});

//Si hacemos click en el boton para ver perfil
document.querySelector("#verUsuario").addEventListener("click", function () {
  myModalUser.show();
});
