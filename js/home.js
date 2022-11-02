// Traemos la informacion del usuario que tenemos en el localStorage.
let usuario = JSON.parse(localStorage.getItem("usuario")) || null;

// Traemos todas las peliculas que exiten
let peliculas = JSON.parse(localStorage.getItem("peliculas")) || null;

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

// Cargamos los datos del usuario logueado en el modal del navbar.
let usuarioModal = document.querySelector("#card_avatar");

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
                  </div>
                </div>
              </div>
           </div>
`;

usuarioModal.innerHTML = estructuraAvatar;
// ======================================================================== //

// Funcion que muestra la pelicula destacada en el carousel de destacado
const mostrarDestacado = function () {
  let peliDetacada = peliculas.find(function (peli) {
    return peli.destacado === true;
  });

  console.log(peliDetacada);

  if (peliDetacada) {
    let contenedorDestacado = document.querySelector("#destacado");

    // Remplazamos los valores predefinos por los valores de la peli destacada
    document.querySelector("#carouselImgDestacado").src = peliDetacada.banner;
    document.querySelector("#tituloCarousel").innerHTML = peliDetacada.nombre;
    document.querySelector("#textoCarousel").innerHTML =
      peliDetacada.descripcion;

    // Agregamos el ancla que nos redirige al trailer de la pelicula en Youtube
    let contenedorBoton = document.createElement("div");
    contenedorBoton.classList = "mb-3";
    let estructuraBoton = `
    <a class="btn btn-primary" href="https://www.youtube.com/" target="_blank">
      <i class="fa fa-play-circle" aria-hidden="true"></i>
      Ver el trailer
     </a>`;
    contenedorBoton.innerHTML = estructuraBoton;

    contenedorDestacado.appendChild(contenedorBoton);
  }
};
mostrarDestacado();

//Deslogueo de la pagina
document.querySelector("#logout").addEventListener("click", function () {
  localStorage.removeItem("usuario");
  location.href = "./pages/login.html";
});

//Si hacemos click en el boton para ver perfil
document.querySelector("#verUsuario").addEventListener("click", function () {
  myModalUser.show();
});
