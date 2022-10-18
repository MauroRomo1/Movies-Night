// Traemos la informacion del usuario que tenemos en el localStorage.
let usuario = JSON.parse(localStorage.getItem("usuario")) || null;

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
console.log(usuarioRegistrado());

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
            src="${usuario.avatar}"
            alt=""
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

// Cargamos los datos del usuario logueado en el modal del navbar.
let usuarioModal = document.querySelector("#card_avatar");

let estructuraAvatar = `
          <div class="card border-0 text-center" style="max-width: 540px">
              <div class="row g-0">
                <div class="col-md-4">
                  <img
                    src="${usuario.avatar}"
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
                  </div>
                </div>
              </div>
           </div>
`;

usuarioModal.innerHTML = estructuraAvatar;
// ======================================================================== //

//Deslogueo de la pagina
document.querySelector("#logout").addEventListener("click", function () {
  localStorage.removeItem("usuario");
  location.href = "./pages/login.html";
});

//Si hacemos click en el boton para ver perfil
document.querySelector("#verUsuario").addEventListener("click", function () {
  myModalUser.show();
});
