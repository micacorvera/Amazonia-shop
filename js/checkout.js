const compra = document.getElementById("carrito-resumen")
const tarjeta = document.getElementById("tarjeta");
const pagoTarjeta = document.getElementById("pago-tarjeta");
const formFactura = document.getElementById("facturacion")
const botonContinuar = document.getElementById("continuar")
const datosForm = document.getElementById("datos-form")
const inputs = document.querySelectorAll("#datos-form input")
const expresiones = {
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	dni: /^\d{6,9}$/ // 6 a 9 numeros.
}
const campos ={
    mail: false,
    nombre: false,
    apellido: false,
    dni: false,
}

let cantClicks = 0
const mp = document.getElementById("mp")
carrito = JSON.parse(localStorage.getItem('carrito'))

const validarFormulario = (e) =>{
    switch(e.target.name){
        case "email": 
            validarCampo(expresiones.correo, e.target, "mail")
        break;
        case "nombre": 
            validarCampo(expresiones.nombre, e.target, "nombre")
        break;
        case "apellido": 
            validarCampo(expresiones.apellido, e.target, "apellido")
        break;
        case "dni": 
            validarCampo(expresiones.dni, e.target, "dni")
        break;
    }
}

const validarCampo = (expresion, input, campo) =>{
    if(expresion.test(input.value)){
        document.querySelector(`#grupo-${campo} .alertas`).classList.remove("alertas-activa")
        campos[campo] = true
    } else {
        document.querySelector(`#grupo-${campo} .alertas`).classList.add("alertas-activa")
        campos[campo] = false
    }
}
inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur', validarFormulario)
})

try{
    datosForm.addEventListener('submit', (e)=>{
        e.preventDefault()
        if ((campos.mail && campos.nombre && campos.apellido && campos.dni) === true){
            location.href = "./payment.html"
        }
    })
}catch (error){
    console.error("el objeto no se encuentra en esta página")
}


function mostrarResumen(lista){
    lista.forEach((producto)=>{
        let fila = document.createElement('div');
        fila.className="resumen-producto"
        fila.innerHTML = `
        <img src=${producto.img}>
        <h3>${producto.type}</h3>
        <h3>${producto.price}</h3>
        <h3>x${producto.amount}</h3>`
        compra.appendChild(fila)
    })
}
mostrarResumen(carrito)



tarjeta.addEventListener("click", ()=>{
    const form = document.getElementById("tarjeta-form");
    cantClicks++;
    if (cantClicks%2 != 0){
        form.style.display="block"
    } else if (cantClicks%2 == 0){
        form.style.display = "none"
    }
});

const finalizarCompra = document.getElementById("finalizarCompra")
    finalizarCompra.addEventListener("click", ()=>{
        Swal.fire({
            title: "Pago realizado",
            text: "Podrás ver tu factura a continuación",
            icon: "success",
            iconColor: 'green',
            confirmButtonColor:'#500650',
        })
    }
    )

    console.log(carrito)
    const subtotal = carrito.reduce(function(acumulador, valorActual) {
        return acumulador + valorActual;
    }, 0);
    console.log(subtotal);


    /* function redireccionar(){
        
    }
 */
    /*  */
    
    /* const headName = JSON.parse(localStorage.getItem("usuario"));
    let userName = document.querySelector("#userName")
    userName.innerText=`${headName.name}`; */

    