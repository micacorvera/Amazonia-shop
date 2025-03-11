
//almacenamiento de usuario
const nombre = document.getElementById("nombre")
const email = document.getElementById("email")
const numero = document.getElementById("telefono")
const contrasenia = document.getElementById("password")
const contraseniaVerf = document.getElementById("password2")
const form = document.getElementById("form")
const signIn = document.getElementById("crearCuenta")
const cerrarSesion = document.getElementById("cerrarSesion")

signIn.addEventListener("click", e=>{
    e.preventDefault()
    let warnings = document.querySelector("#warnings")
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(!regexEmail.test(email.value) || email.value.length == 0){   
        warnings.innerText = `El correo no es válido`;
        warnings.style.display = "block"
    }
    if(contrasenia.value.length <6){
        warnings.innerText = `La contraseña debe tener al menos 6 caracteres`;
        warnings.style.display = "block"
    } 
    if(contrasenia.value != contraseniaVerf.value){
        warnings.innerText = `Las contraseñas no coinciden`;
        warnings.style.display = "block"
    }else if (contrasenia.value === contraseniaVerf.value && contrasenia.value.length >6 && regexEmail.test(email.value)==true){
        function usuario (nombre, numero, email){
            this.name = nombre.value;
            this.number = numero.value;
            this.mail= email.value 
            }
            let user = new usuario(nombre, numero, email)
            localStorage.setItem("usuario", JSON.stringify(user))
            let bienvenida = document.querySelector("#bienvenida")
            bienvenida.innerText=`¡Te damos la bienvenida, 
                                ${user.name}!`;}
})
