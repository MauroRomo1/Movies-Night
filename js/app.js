class Usuario {
  constructor(
    nombre,
    apellido,
    username,
    email,
    password,
    imagen,
    listaPeliculas = [],
    activo = true,
    rol = "Usuario"
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.username = username;
    this.email = email;
    this.password = password;
    this.imagen = imagen;
    this.listaPeliculas = listaPeliculas;
    this.activo = activo;
    this.rol = rol;
  }
}

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

let forms = document.querySelectorAll("#formRegistro");

// Loop over them and prevent submission
Array.prototype.slice.call(forms).forEach(function (form) {
  form.addEventListener(
    "submit",
    function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        console.log("todo bien");
        agregarUsuario();
      }

      form.classList.add("was-validated");
    },
    false
  );
});

const agregarUsuario = function () {
  let email = document.querySelector("#correo").value;
  let password = document.querySelector("#password").value;
  let nombre = document.querySelector("#nombre").value;
  let apellido = document.querySelector("#apellido").value;
  let username = document.querySelector("#username").value;
  let avatarUsuario = document.querySelector("#avatarUsuario").value;

  // Validar si el correo o el username ya existe
  let validacion = validarUsario(email, username);

  if (!validacion) {
    usuarios.push(
      new Usuario(nombre, apellido, username, email, password, avatarUsuario)
    );
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    location.href = "../pages/login.html";
  } else {
    alert(
      "Usuario o correo electrónico ya existe, inicie sesion con sus datos"
    );
    location.reload();
  }
};

// Funcion que valida si el correo o el username ya exiten para poder registrarse
const validarUsario = function (correo, username) {
  let checkEmail = usuarios.find(function (user) {
    return user.email === correo;
  });

  let checkUsername = usuarios.find(function (user) {
    return user.username === username;
  });

  if (checkEmail || checkUsername) {
    return true;
  } else {
    return false;
  }
};

// Validamos los datos de logueo
const validarDatos = function () {
  let inputEmail = document.querySelector("#input_email").value;
  let inputPassword = document.querySelector("#input_password").value;

  let validar_email = usuarios.find(function (usuario) {
    return usuario.email === inputEmail;
  });

  if (validar_email) {
    if (validar_email.password === inputPassword) {
      console.log("usuario encontrado");

      let datos = {
        email: validar_email.email,
        username: validar_email.username,
        rol: validar_email.rol,
        avatar: validar_email.imagen,
        listaPeliculas: validar_email.listaPeliculas,
      };

      localStorage.setItem("usuario", JSON.stringify(datos));
      location.replace("../index.html");
    } else {
      alert("Email o contraseña incorrectos");
    }
  } else {
    alert("Email o contraseña incorrectos");
  }
};

document.querySelector("#formulario").addEventListener("submit", function (e) {
  e.preventDefault();
  validarDatos();
});
