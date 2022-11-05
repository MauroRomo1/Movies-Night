// Clase para crear las peliculas
class Pelicula {
  constructor(
    portada,
    banner,
    id,
    nombre,
    descripcion,
    categoria,
    publicada = false,
    destacado = false
  ) {
    this.portada = portada;
    this.banner = banner;
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.categoria = categoria;
    this.publicada = publicada;
    this.destacado = destacado;
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

// Modal 1
const myModal1 = new bootstrap.Modal("#modal1", {
  keyboard: false,
});

// Modal 2
const myModal2 = new bootstrap.Modal("#modal2", {
  keyboard: false,
});

//creo variable que guarda el id de la pelicula
let indicePeli = null;

// Tbody de las peliculas
let contenedorTabla = document.querySelector("#cuerpoTabla");

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
              usuario.rol === "Administrador"
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
if (!usuario || usuario.rol === "Usuario") {
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

// agregamos la imagen que se puso en el input de portada
const agregarImagenPortada = function (e) {
  let inputPortada = document.querySelector("#inputPortadaPeli");

  if (e.keyCode === 13) {
    document.querySelector("#portadaImg").src = inputPortada.value;
  }
};

// agregamos la imagen que se puso en el input de banner
const agregarImagenBanner = function (e) {
  let inputBanner = document.querySelector("#inputBannerPeli");

  if (e.keyCode === 13) {
    document.querySelector("#bannerImg").src = inputBanner.value;
  }
};

//  Si el onerror de la imagen portada se activa
const imgPortadaError = function () {
  document.querySelector("#portadaImg").src =
    "http://127.0.0.1:5500/images/error_img.png";
  alert("Debe de cargar una URL de una imagen valida");
  document.querySelector("#inputPortadaPeli").value = "";
  return true;
};

//  Si el onerror de la imagen Banner se activa
const imgBannerError = function () {
  document.querySelector("#bannerImg").src =
    "http://127.0.0.1:5500/images/error_imgBanner.png";
  alert("Debe de cargar una URL de una imagen valida");
  document.querySelector("#inputBannerPeli").value = "";
  return true;
};

// Agregamos una nueva pelicula con los datos del formulario
const agregarPelicula = function () {
  let portada = document.querySelector("#inputPortadaPeli").value;
  let banner = document.querySelector("#inputBannerPeli").value;
  let id = new Date().getTime();
  let nombre = document.querySelector("#namePeli").value;
  let descripcion = document.querySelector("#descripcionPeli").value;
  let categoria = document.querySelector("#categoriaPeli").value;
  let publicada = document.querySelector("#publicadaPeli").checked;

  let validar = peliculaExiste(portada, banner, nombre);

  if (!validar) {
    peliculas.push(
      new Pelicula(
        portada,
        banner,
        id,
        nombre,
        descripcion,
        categoria,
        publicada
      )
    );
    localStorage.setItem("peliculas", JSON.stringify(peliculas));
    limpiarCamposPeli();
  } else {
    alert(
      "La pelicula que quiere cargar ya exite, por favor verifique los datos"
    );
  }
};

const limpiarCamposPeli = function () {
  // Volvemos a poner las imagenes dafaut de portada y banner
  document.querySelector("#portadaImg").src =
    "http://127.0.0.1:5500/images/error_img.png";
  document.querySelector("#bannerImg").src =
    "http://127.0.0.1:5500/images/error_imgBanner.png";

  // Limpiamos los campos de portada y banner
  document.querySelector("#inputPortadaPeli").value = "";
  document.querySelector("#inputBannerPeli").value = "";
  // Limpiamos todo el resto que esta dentro del formulario
  document.querySelector("#formPeli").reset();
};

const cargarTablaPelis = function () {
  contenedorTabla.innerHTML = "";

  peliculas.map(function (peli, index) {
    let fila = document.createElement("tr");

    let estructura = `
            <td>${peli.id}</td>
            <td><b>${peli.nombre}</b></td>
            <td>${peli.descripcion}</td>
            <td class="text-center">${peli.categoria}</td>
            <td class="text-center">
            ${
              peli.publicada
                ? `<input class="form-check-input" type="checkbox" role="button" onclick="publicarPeli(${index})" id="flexCheckChecked" checked>`
                : `<input class="form-check-input" type="checkbox" role="button" onclick="publicarPeli(${index})" id="flexCheckChecked">`
            }
            </td>
            <td>
            <i class="fa fa-trash fa-2x text-danger" aria-hidden="true" role="button" onclick="borrarPelicula(${index})"></i>
            </td>
            <td>
            ${
              peli.destacado
                ? `<i class="fa fa-star fa-2x text-warning" aria-hidden="true" role="button" onclick="marcarDestacado(${index})"></i>`
                : `<i class="fa fa-star-o fa-2x text-warning" aria-hidden="true" role="button" onclick="marcarDestacado(${index})"></i>`
            }
            
            </td>
    `;
    fila.innerHTML = estructura;
    contenedorTabla.appendChild(fila);
  });
};

cargarTablaPelis();
// Verificamos que ya no extista una pelicula con la misma portada, banner o nombre
const peliculaExiste = function (portada, banner, nombre) {
  let checkPortada = peliculas.find(function (peli) {
    return peli.portada === portada;
  });

  let checkBanner = peliculas.find(function (peli) {
    return peli.banner === banner;
  });

  let checkNombre = peliculas.find(function (peli) {
    return peli.nombre === nombre;
  });

  if (checkPortada || checkBanner || checkNombre) {
    return true;
  } else {
    return false;
  }
};

const borrarPelicula = function (indice) {
  let validar = confirm(
    `¿Esta seguro que quieres eliminar la pelicula ${peliculas[indice].nombre}?`
  );

  if (validar) {
    peliculas.splice(indice, 1);
    localStorage.setItem("peliculas", JSON.stringify(peliculas));
    cargarTablaPelis();
    alert("Pelicula eliminada con exito");
  }
};

// Funcion que cambia el estado de publicado de la pelicula selecionada.
const publicarPeli = function (indice) {
  peliculas[indice].publicada = !peliculas[indice].publicada;
  localStorage.setItem("peliculas", JSON.stringify(peliculas));
  cargarTablaPelis();
};

const marcarDestacado = function (indice) {
  let checkDestacado = peliculas.find(function (peli) {
    return peli.destacado;
  });
  console.log(checkDestacado);
  if (checkDestacado) {
    alert("Ya hay una pelicula marcada como favorita");
    let confirmar = confirm(
      "¿Le gustaria desmarcar la que ya esta marcada y marcar esta?"
    );
    if (confirmar) {
      checkDestacado.destacado = false;
      peliculas[indice].destacado = true;
      localStorage.setItem("peliculas", JSON.stringify(peliculas));
      cargarTablaPelis();
    }
  } else {
    peliculas[indice].destacado = true;
    localStorage.setItem("peliculas", JSON.stringify(peliculas));
    cargarTablaPelis();
  }
};

const existePeliDestacada = function () {
  let checkDestacado = peliculas.find(function (peli) {
    return peli.destacado;
  });

  if (checkDestacado) {
    return true;
  } else {
    return false;
  }
};

// Si presionamos el boton de nueva pelicula
document.querySelector("#nuevaPeli").addEventListener("click", function () {
  myModal1.show();
});

// Si presionamos el boton en el segundo modal de volver atrás
document
  .querySelector("#volverAlModal1")
  .addEventListener("click", function () {
    myModal2.hide();
    myModal1.show();
  });

// Si presionamos el boton de nueva pelicula para continuar
document
  .querySelector("#continuarModal")
  .addEventListener("click", function () {
    let campoPortada = document.querySelector("#inputPortadaPeli").value;
    let campoBanner = document.querySelector("#inputBannerPeli").value;
    if (!campoPortada || !campoBanner) {
      alert("Debes de completar todos los campos para continuar");
    } else if (imgPortadaError === true || imgBannerError === true) {
      alert("Debes de darle enter en los imput para previsualizar");
    } else {
      myModal1.hide();
      myModal2.show();
    }
  });

// Si presionamos enter en el input de portada
document
  .querySelector("#inputPortadaPeli")
  .addEventListener("keydown", agregarImagenPortada);

// Si presionamos enter en el input de banner
document
  .querySelector("#inputBannerPeli")
  .addEventListener("keydown", agregarImagenBanner);

// Si presionamos el boton para enviar el formulario
document.querySelector("#formPeli").addEventListener("submit", function (e) {
  e.preventDefault();
  agregarPelicula();
  location.reload();
});

//Deslogueo de la pagina
document.querySelector("#logout").addEventListener("click", function () {
  localStorage.removeItem("usuario");
  location.href = "../pages/login.html";
});

//Si hacemos click en el boton para ver perfil
document.querySelector("#verUsuario").addEventListener("click", function () {
  myModalUser.show();
});
