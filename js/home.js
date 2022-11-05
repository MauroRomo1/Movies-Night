// Traemos la informacion del usuario que tenemos en el localStorage.
let usuario = JSON.parse(localStorage.getItem("usuario")) || null;

// Traemos todas las peliculas que esten publicadas
let peliculas = JSON.parse(localStorage.getItem("peliculas")) || null;

peliculas = peliculas.filter(function (peli) {
  return peli.publicada;
});

// guardamos la pelicula destacada si es que existe alguna, sino null
let peliDetacada =
  peliculas.find(function (peli) {
    return peli.destacado === true;
  }) || null;

// Guardamos las peliculas de categoria Terror
let pelisTerror =
  peliculas.filter(function (peli) {
    return peli.categoria === "Terror";
  }) || null;

// Guardamos las peliculas de categoria Accion
let pelisAccion =
  peliculas.filter(function (peli) {
    return peli.categoria === "Accion";
  }) || null;

// Guardamos las peliculas de categoria Animadas
let pelisAnimadas =
  peliculas.filter(function (peli) {
    return peli.categoria === "Animada";
  }) || null;

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
            usuario.rol === "admin"
              ? '<li><a class="dropdown-item" href="../pages/adminUsuarios.html">Administracion</a></li>'
              : '<li><a class="dropdown-item" href="../pages/error404.html">My lista</a></li>'
          }
        </ul>
  </div>
  `;

    contenedorBotones.innerHTML = estructuraNavbar;
  }
};
modificarNavbar();

// Cargamos los datos del usuario logueado en el modal del navbar.
if (usuario) {
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

  //Si hacemos click en el boton para ver perfil
  document.querySelector("#verUsuario").addEventListener("click", function () {
    myModalUser.show();
  });
}
// ======================================================================== //

// Funcion que muestra la pelicula destacada en el carousel de destacado
const mostrarDestacado = function () {
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
    <a class="btn btn-primary" href="../pages/error404.html">
      <i class="fa fa-play-circle" aria-hidden="true"></i>
      Ver el trailer
     </a>`;
    contenedorBoton.innerHTML = estructuraBoton;

    contenedorDestacado.appendChild(contenedorBoton);
  }
};
mostrarDestacado();

// Funcion que comprueba si hay peliculas de la categoria que le pasamos como paramentro
const hayPeliCategoria = function (peliCategoria) {
  if (peliCategoria.length === 0) {
    return false;
  } else {
    return true;
  }
};

const cargarContenidoCategorias = function (pelisCategoria, id) {
  let cotenidoCategoria = document.querySelector(`#${id}`);
  pelisCategoria.map(function (peli) {
    let elemento = document.createElement("div");
    elemento.classList.add("carousel__elemento");
    let elementoContendio = `
                    <a href="../pages/error404.html" class="text-dark text-decoration-none">
                      <img
                        class"imgCategoria"
                        src="${peli.portada}"
                        alt="${peli.nombre} portada"
                      />
                      <p><b>${peli.nombre}</b></p>
                    </a>
    `;
    elemento.innerHTML = elementoContendio;
    cotenidoCategoria.appendChild(elemento);
  });
};

const cargarPelisTerror = function () {
  let validacion = hayPeliCategoria(pelisTerror);

  if (!validacion) {
    let fila = document.querySelector("#carouselTerror");
    let titulo = `
    <h4 class="text-center mb-4"><b>No hay peliculas de esta categoria.</b></h4>
    `;
    fila.innerHTML = titulo;
  } else {
    let id = document.querySelector("#carouselTerrorLista").id;
    cargarContenidoCategorias(pelisTerror, id);
  }
};
cargarPelisTerror();

const cargarPelisAccion = function () {
  let validacion = hayPeliCategoria(pelisAccion);

  if (!validacion) {
    let fila = document.querySelector("#carouselAccion");
    let titulo = `
    <h4 class="text-center mb-4"><b>No hay peliculas de esta categoria.</b></h4>
    `;
    fila.innerHTML = titulo;
  } else {
    let id = document.querySelector("#carouselAccionLista").id;
    cargarContenidoCategorias(pelisAccion, id);
  }
};
cargarPelisAccion();

const cargarPelisAnimada = function () {
  let validacion = hayPeliCategoria(pelisAnimadas);

  if (!validacion) {
    let fila = document.querySelector("#carouselAnimada");
    let titulo = `
    <h4 class="text-center mb-4"><b>No hay peliculas de esta categoria.</b></h4>
    `;
    fila.innerHTML = titulo;
  } else {
    let id = document.querySelector("#carouselAnimadaLista").id;
    cargarContenidoCategorias(pelisAnimadas, id);
  }
};
cargarPelisAnimada();

//Deslogueo de la pagina
document.querySelector("#logout").addEventListener("click", function () {
  localStorage.removeItem("usuario");
  location.href = "./pages/login.html";
});

// Categoria Terror
window.addEventListener("load", function () {
  new Glider(document.querySelector("#carouselTerrorLista"), {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: {
      prev: ".carouselTerror__anterior",
      next: ".carouselTerror__siguiente",
    },
    responsive: [
      {
        // screens greater than >= 450px
        breakpoint: 450,
        settings: {
          // Set to `auto` and provide item width to adjust to viewport
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        // screens greater than >= 800px
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  });
});
// ----------------------------------------------------------------------------- //

// Categoria Accion
window.addEventListener("load", function () {
  new Glider(document.querySelector("#carouselAccionLista"), {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: {
      prev: ".carouselAccion__anterior",
      next: ".carouselAccion__siguiente",
    },
    responsive: [
      {
        // screens greater than >= 450px
        breakpoint: 450,
        settings: {
          // Set to `auto` and provide item width to adjust to viewport
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        // screens greater than >= 800px
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  });
});
// ----------------------------------------------------------------------------- //

// Categoria Animadas
window.addEventListener("load", function () {
  new Glider(document.querySelector("#carouselAnimadaLista"), {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: {
      prev: ".carouselAnimada__anterior",
      next: ".carouselAnimada__siguiente",
    },
    responsive: [
      {
        // screens greater than >= 450px
        breakpoint: 450,
        settings: {
          // Set to `auto` and provide item width to adjust to viewport
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        // screens greater than >= 800px
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  });
});
// ----------------------------------------------------------------------------- //
