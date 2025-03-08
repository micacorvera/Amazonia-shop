
//almacenamiento de usuario
const nombre = document.getElementById("nombre")
const email = document.getElementById("email")
const numero = document.getElementById("telefono")
const contrasenia = document.getElementById("password")
const contraseniaVerf = document.getElementById("password2")
const signIn = document.getElementById("crearCuenta")
const noCoincidence = document.getElementById("noCoincidence")
const cerrarSesion = document.getElementById("cerrarSesion")

const guardarUsuario = () =>{
    if (contrasenia.value === contraseniaVerf.value){
        function usuario (nombre, numero, email){
            this.name = nombre.value;
            this.number = numero.value;
            this.mail= email.value 
            }
            noCoincidence.style.display = "none";
            let user = new usuario(nombre, numero, email)
            localStorage.setItem("usuario", JSON.stringify(user))
            let bienvenida = document.querySelector("#bienvenida")
            bienvenida.innerText=`¡Te damos la bienvenida, 
                                ${user.name}!`;
    }else if (contrasenia.value != contraseniaVerf.value){
        noCoincidence.style.display = "block";
    }
}
signIn.addEventListener("click", guardarUsuario);