const compra = document.getElementById("carrito-resumen")
const tarjeta = document.getElementById("tarjeta");
const pagoTarjeta = document.getElementById("pago-tarjeta");
const formFactura = document.getElementById("facturacion")
const botonContinuar = document.getElementById("continuar")
const datosForm = document.getElementById("datos-form")
const inputs = document.querySelectorAll("#datos-form input")
const formTarjeta = document.getElementById("tarjeta-form")
const inputsCard = document.querySelectorAll("#tarjeta-form input")
const finalizarCompra = document.getElementById("finalizarCompra")
const emailInfo = document.getElementById('email-info')
const envioInfo = document.getElementById('envio-info')
const infoCobro = document.getElementById('info-cobro')
const expresiones = {
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    telefono: /^\d{6,11}$/,
	dni: /^\d{6,9}$/, // 6 a 9 numeros.
    tarjeta: /^\d{16,16}$/,
    titular: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    cvv: /^\d{3,3}$/,
}
const campos ={
    mail: false,
    nombre: false,
    apellido: false,
    telefono:false,
    dni: false,
    tarjeta: false,
    titular: false,
    cvv: false,
}
let cantClicks = 0
const mp = document.getElementById("mp")
carrito = JSON.parse(localStorage.getItem('carrito'))

/*---pag checkout---*/
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
        case "tel": 
            validarCampo(expresiones.telefono, e.target, "telefono")
        break;
    }
}


inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur', validarFormulario)
})
const validarCampo = (expresion, input, campo) =>{
    if(expresion.test(input.value)){
        document.querySelector(`#grupo-${campo} .alertas`).classList.remove("alertas-activa")
        campos[campo] = true
    } else {
        document.querySelector(`#grupo-${campo} .alertas`).classList.add("alertas-activa")
        campos[campo] = false
    }
}
try{
    datosForm.addEventListener('submit', (e)=>{
        e.preventDefault()
        if ((campos.mail && campos.nombre && campos.apellido && campos.telefono) === true){
            location.href = "./payment.html";
        }
    })
    datosForm.addEventListener("submit", e =>{
        e.preventDefault()
        const data = Object.fromEntries(
            new FormData(e.target)
        )
        sessionStorage.setItem('datosFacturacion', JSON.stringify(data))
    })
}catch (error){
    console.error("el objeto no se encuentra en esta página")
}finally{
    infoCliente()
}

function infoCliente(){
    const datosFacturacion = JSON.parse(sessionStorage.getItem('datosFacturacion'))
    console.log(datosFacturacion)
    emailInfo.innerText=`${datosFacturacion.email}`
    infoCobro.innerText= `Datos de cobro: \n ${datosFacturacion.nombre} ${datosFacturacion.apellido} 
    ${datosFacturacion.tel}`

}


function mostrarResumen(lista){
    lista.forEach((producto)=>{
        let fila = document.createElement('div');
        fila.className="resumen-producto"
        fila.innerHTML = `
        <img src=${producto.img}>
        <h3>${producto.type}</h3>
        <h3>$${producto.price*producto.amount}</h3>
        <h3>x${producto.amount}</h3>`
        compra.appendChild(fila)
    })
}
mostrarResumen(carrito)
console.log(carrito)

const filaSubtotal = document.getElementById("subtotal")
const filaTotal = document.getElementById("total")
const precios = []
const precioEnvío = 0
carrito.forEach((producto)=>{
    precios.push(producto.price)
})
const subtotal = precios.reduce(function(acumulador, valorActual) {
    return acumulador + valorActual;
}, 0);
console.log(subtotal);

function mostrarSubtotal(){
    filaSubtotal.innerText = `Subtotal:     $${subtotal}`
    filaTotal.innerText = `Total:  $${subtotal+precioEnvío}`
}
mostrarSubtotal()

/*pagina payment*/
tarjeta.addEventListener("click", ()=>{
    const form = document.getElementById("tarjeta-form");
    cantClicks++;
    if (cantClicks%2 != 0){
        form.style.display="block"
    } else if (cantClicks%2 == 0){
        form.style.display = "none"
    }
});

const validarTarjeta = (e) =>{
    switch(e.target.name){
        case "num-tarjeta": 
            validarCampo(expresiones.tarjeta, e.target, "tarjeta")
        break;
        case "nombre-titular": 
            validarCampo(expresiones.titular, e.target, "titular")
        break;
        case "cod-seguridad": 
            validarCampo(expresiones.cvv, e.target, "cvv")
        break;
        case "dni": 
            validarCampo(expresiones.dni, e.target, "dni")
        break;
    }
}
inputsCard.forEach((input) => {
    input.addEventListener('keyup', validarTarjeta)
    input.addEventListener('blur', validarTarjeta)
})

    finalizarCompra.addEventListener('click', (e)=>{
        e.preventDefault()
        if ((campos.tarjeta && campos.titular && campos.cvv && campos.dni) === true){
            Swal.fire({
                title: "Pago realizado",
                text: "Podrás ver tu factura a continuación",
                icon: "success",
                iconColor: 'green',
                confirmButtonColor:'#500650',
            })
        }
    })




    /* function redireccionar(){
        
    }
 */
    /*  */
    
/*     const headName = JSON.parse(localStorage.getItem("usuario"));
    let userName = document.querySelector("#userName")
    userName.innerText=`${headName.name}`; 
 */
    