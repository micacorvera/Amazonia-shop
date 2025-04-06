
//variables
const addToCart = document.getElementById("boton")
const datos = document.querySelector("#datosProducto tbody")
const vaciarCarrito = document.getElementById("emptyCart")
const fila = document.getElementById("itemDatos")
const botonCarrito = document.getElementById("cartIcon")
const carritoFloat = document.getElementById("carrito")
let carrito = []
const products = document.getElementById("productos") 
const botonPagar = document.getElementById("finalizarCompra")
const noResults = document.getElementById("noResults")
const iniciarCompra = document.querySelector("#cont-compra")
const aumentar = document.querySelector("aumentar");
const contar = document.querySelector("counter");
const restar = document.querySelector("restar")
let contador = 0;

/*---buscador y página de producto----*/

    const mostrarProductos = (lista) =>{
        try{
            products.innerHTML="";
            if (lista.length === 0){
                noResults.style.display = "block";
            } else {
                lista.forEach((producto) => {
                    let card = document.createElement("div")
                    card.className = "card"
                    card.id = `${producto.id}`
                    card.innerHTML = `<img src="${producto.imagen}">
                                    <h3>${producto.tipo} x ${producto.cantidad}gr</h3>
                                    <h4>$${producto.precio}</h4>
                                    <h5>${producto.cantidad}gr.</h5>
                                    <a class="agregar-carrito" id="boton" >Agregar al carrito</a>`
                products.appendChild(card)
            })
            noResults.style.display = "none";
            }
        }catch(error){
            console.error("el objeto no está en esta página")
    }}


fetch("../db/data.json")
    .then(response => response.json())
    .then(data => {mostrarProductos(data)
            busqueda(data)} 
    )

    const input = document.getElementById("buscador")

    function busqueda (lista) {
        const searchTerm = input.value.toLowerCase();
        const filtrados = lista.filter((producto) =>
            producto.tipo.toLowerCase().startsWith(searchTerm));
        mostrarProductos(filtrados)
    }
    input.addEventListener("input", busqueda) 

    
    

//eventListeners
cargarEventListeners();
function cargarEventListeners(){
    let cantClicks = 0
    botonCarrito.addEventListener("click", ()=> {
        cantClicks++;
        if (cantClicks%2 != 0){
            carritoFloat.style.display="block"
        } else if (cantClicks%2 == 0){
            carritoFloat.style.display = "none"
        }
    })
    carritoFloat.addEventListener("click", ()=>{
        carritoFloat.style.display ="block"
    })

    products.addEventListener("click", agregarAlcarrito);

    //eliminar producto
    borrar.addEventListener("click", eliminarProducto)

    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carritoHTML()
    //vaciar carrito
    vaciarCarrito.addEventListener("click", () =>{
        carrito = []; 
        limpiarHTML();
        sincronizarStorage()
    })
    // boton de cantidad de productos
}


function agregarAlcarrito(e){
    if(e.target.classList.contains("agregar-carrito")){
        const productoSeleccionado = e.target.parentElement;
        leerDatosProducto(productoSeleccionado)
    }
}

function eliminarProducto(e) {
    if (e.target.classList.contains("borrar")){
        const productId = e.target.getAttribute('id');
        const existe = carrito.some(product => ( product.id === Number(productId) && product.amount > 1));
        if(existe){
            const producto = carrito.map(product => {
                if(product.id === Number(productId)){
                    product.amount--;
                }
                    return product
            });
            carrito = [...producto]
        }else{
            carrito = carrito.filter(producto => producto.id !== Number(productId));
        }     
        console.log(productId)
        carritoHTML();
    }
}
            /* aumentar.onclick = ()=>{
                contador++;
            contar.innerHTML = contador
        }
        restar.onclick = () =>{
            contador--;
            contar.innerHTML = contador
        }
 */

async function leerDatosProducto(product){
    try{
        const productId = Number(product.id);
        const response = await fetch ('../db/data.JSON')
        if (!response.ok) {    
            throw new Error(`Error al obtener datos: ${response.status}`);
        }
        const data = await response.json();
        const productoEncontrado = data.find(data =>data.id === productId)
        if (productoEncontrado){ 
            let infoProduct = {
                id: productoEncontrado.id,
                type: productoEncontrado.tipo,
                cant: productoEncontrado.cantidad,
                img: productoEncontrado.imagen,
                price: productoEncontrado.precio,
                amount: 1
        };
        console.log(infoProduct)
        const existe = carrito.some(product => Number(product.id) === infoProduct.id);
        if(existe){
            const producto = carrito.map(product => {
                if(Number(product.id) === infoProduct.id){
                    product.amount++;
                    return product
                }else{
                    return product
                }
            });
            carrito = [...producto]
        }else{
            carrito.push(infoProduct)
        }    
        carritoHTML();
        }}
        catch(err){
            console.error("Error fetch")
        }}
    


function carritoHTML(){

    limpiarHTML();
    carrito.forEach((item) => {
    const {type, id, amount, img, price} = item;
    let fila = document.createElement("tr");
        fila.id = "itemDatos";
        fila.innerHTML = `
        <th><div id="imgProducto"><img src="${img}"></div></th>
        <th><h3 id="tipoProducto">${type}</h3></th>
        <th><button class="aumentar" id="${id}">+</button>
        <span id="${id}" class="counter">${amount}</span>
        <button class="restar" id="${id}">-</button></th>
        <th><h4 id="precioUnidad">${price}</h4></th>
        <th><h4 id="precioCant">${price*amount}</h4></th>
        <th><button class="borrar"><img id="${id}" class="borrar" src="../img/borrar.png"></button></th>
        `;
        datos.appendChild(fila);
    //agregar carrito al storage
    sincronizarStorage();
})};

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

function limpiarHTML(){
    while(datos.firstChild){
        datos.removeChild(datos.firstChild);
    }
}
