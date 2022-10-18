// Traemos la informacion del usuario que tenemos en el localStorage.
let usuario = JSON.parse(localStorage.getItem("usuario")) || null;

console.log(usuario);

// Verificamos si el usuario esta logueado
const usuarioRegistrado = function name() {
  if (!usuario) {
    return false;
  } else {
    return true;
  }
};
console.log(usuarioRegistrado());

const modificarNavbar = function () {
  if (usuarioRegistrado()) {
    let contenedorBotones = document.querySelector("#contenedor_botones");

    let estrucutraNavbar = `
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
          <li><a class="dropdown-item" href="#">Perfil</a></li>
          ${
            usuario.rol === "admin_rol"
              ? '<li><a class="dropdown-item" href="#">Administracion</a></li>'
              : '<li><a class="dropdown-item" href="#">My lista</a></li>'
          }
        </ul>
  </div>
  `;

    contenedorBotones.innerHTML = estrucutraNavbar;
    console.log("hola");
  } else {
    console.log("usuario no logueado");
  }
};
modificarNavbar();
