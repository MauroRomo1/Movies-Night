class Usuario {
  constructor(
    nombre,
    apellido,
    username,
    email,
    password,
    activo = true,
    rol = "user_rol"
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.username = username;
    this.email = email;
    this.password = password;
    this.activo = activo;
    this.rol = rol;
  }
}

let usuarios = [];

let user1 = new Usuario(
  "Pedrito",
  "Gonzalez",
  "pgonzalez",
  "pedritobueno@gmail.com",
  "pp123456"
);

const agregarUsuario = function (user) {
  usuarios.push(user);
};

agregarUsuario(user1);

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
