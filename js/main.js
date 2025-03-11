//datos de los productos
const productos = [
    {
        id: 1,
        tipo: "açaí dulce",
        precio: 10000,
        cantidad: 1000,
        imagen: "../img/acaipuro.jpg"
    },
    {
        id: 2,
        tipo: "açaí puro",
        precio: 10000,
        cantidad: 1000,
        imagen:"../img/acaipuro.jpg"
    },
    {
        id: 3,
        tipo: "frutos rojos",
        precio: 6000,
        cantidad: 500,
        imagen:'../img/frutosRojos.jpg'
    },
    {
        id: 4,
        tipo:"pulpa de guayaba",
        precio: 8000,
        cantidad: 1000,
        imagen:'../img/guayaba.webp'
    },
    {
        id: 5,
        tipo:"pulpa de maracuyá",
        precio: 9000,
        cantidad: 1000,
        imagen:'../img/maracuya.jpg'
    },
    {
        id: 6,
        tipo: "mango congelado",
        precio: 9000,
        cantidad: 1000,
        imagen:'../img/mango.jpg'
    }
]
//variables
const addToCart = document.getElementById("boton")
const datos = document.querySelector("#datosProducto tbody")
const vaciarCarrito = document.getElementById("emptyCart")
const card = document.querySelector("card")
const fila = document.getElementById("itemDatos")
let carrito = []


const headName = JSON.parse(localStorage.getItem("usuario"));
let userName = document.querySelector("#userName")
userName.innerText=`${headName.name}`;

/*---buscador y página de producto----*/
const products = document.getElementById("productos") 
const noResults = document.getElementById("noResults")
const mostrarProductos = (lista) =>{
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
}
mostrarProductos(productos) ;

const input = document.getElementById("buscador")
const busqueda = () => {
    const searchTerm = input.value.toLowerCase();
    const filtrados = productos.filter((producto) =>
        producto.tipo.toLowerCase().startsWith(searchTerm));
    mostrarProductos(filtrados)
}
input.addEventListener("input", busqueda)


//carrito



//eventListeners
cargarEventListeners();
function cargarEventListeners(){

    products.addEventListener("click", agregarAlcarrito);

    //eliminar producto
    datos.addEventListener("click", eliminarProducto)

    document.addEventListener('DOMContentLoaded', () => {
        carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML()
    })
    //vaciar carrito
    vaciarCarrito.addEventListener("click", () =>{
        carrito = []; 
        limpiarHTML();
        sincronizarStorage()
    })
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
        const existe = carrito.some(product => ( product.id === productId && product.amount > 1));
        if(existe){
            const producto = carrito.map(product => {
                if(product.id === productId){
                    product.amount--;
                }
                    return product
            });
            carrito = [...producto]
        }else{
            carrito = carrito.filter(producto => producto.id !== productId);
        }     
        
        carritoHTML();
    }
    
}

function leerDatosProducto(product){
    let infoProduct = { 
        type : product.querySelector('h3').textContent,
        price : product.querySelector('h4').textContent,
        cant : product.querySelector('h5').textContent,
        img: product.querySelector('img').src,
        id: product.id,
        amount: 1
    }
    const existe = carrito.some(product => product.id === infoProduct.id);
    if(existe){
        const producto = carrito.map(product => {
            if(product.id === infoProduct.id){
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
    console.log(existe)
    console.log(carrito);
    carritoHTML();
}
function carritoHTML(){

    limpiarHTML();
    carrito.forEach((item) => {
        const {type, price, amount, img, id} = item;
        let fila = document.createElement("tr");
        fila.id = "itemDatos";
        fila.innerHTML = `
        <th><div id="imgProducto"><img src="${img}"></div></th>
        <th><h3 id="tipoProducto">${type}</h3></th>
        <th><h3 id="cantProducto">${amount}</h3></th>
        <th><h4 id="precioUnidad">${price}</h4></th>
        <th><h4 id="precioCant">${price*amount}</h4></th>
        <th><button class="borrar"><img id="${id}" class="borrar" src="../img/borrar.png"></button></th>
        `;
        datos.appendChild(fila)
    })

    //agregar carrito al storage
    sincronizarStorage();

}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

function limpiarHTML(){
    while(datos.firstChild){
        datos.removeChild(datos.firstChild);
    }
}

