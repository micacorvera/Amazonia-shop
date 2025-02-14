alert("Bienvenido a la tienda")
console.log("Productos")
//datos de los productos
const productos = []
productos.push(producto1 = {
    tipo: "Açaí dulce",
    precio: 10000,
    cantidad: 1000
});
productos.push(producto2 = {
    tipo: "Açaí (sin endulzar)",
    precio: 10000,
    cantidad: 1000
});
productos.push(producto3 = {
    tipo: "Frutos Rojos",
    precio: 6000,
    cantidad: 500
});
function mostrarProductos (lista){
    for (const producto of lista){
    console.log(producto.tipo+"- Precio: $"+producto.precio+" - Cantidad: "+producto.cantidad+"gr");
    }
}
mostrarProductos(productos)

//carrito
function agregarAlcarrito(item){
    carrito.push(item)
    console.log((item.tipo)+" - Precio: $"+(item.precio)+" - Cantidad: "+(item.cantidad)+"gr")
}
const carrito = []
let sumarSubtotal = function (carrito){
    let subtotal = 0;
    for (let elemento of carrito){
        subtotal += elemento.precio
    }
    return subtotal
}
console.log("\n Productos seleccionados \n")
let continuar = true
while (continuar === true) {
    let menu = parseInt(prompt("Ingrese el número de la operación que desea realizar: \n 1-Agregar açaí dulce \n 2-Agregar açaí sin endulzar \n 3-Agregar frutos rojos \n 4-Ver subtotal \n 5-Eliminar último producto \n 6-Finalizar compra"))
    // función con parámetro
    function recargo(total, porcentajeRecargo) {
        return total + (total * porcentajeRecargo / 100);
    }
    function descuento(total, porcentajeDescuento) {
        return total - (total * porcentajeDescuento / 100)
    }
    switch (menu){
        case 1:
            agregarAlcarrito(productos[0])
            break
        case 2:
            agregarAlcarrito(productos[1]) 
            break
        case 3:
            agregarAlcarrito(productos[2])
            break
        case 4:
            console.log("Subtotal: $"+sumarSubtotal(carrito))
            break
        case 5:
            let productoEliminado = carrito.pop();
            console.log(" \n Producto eliminado: "+productoEliminado.tipo+"\n");
            mostrarProductos(carrito)
            console.log("Subtotal: $"+sumarSubtotal(carrito));
            break
        case 6:
            console.clear()
            console.log("Productos seleccionados")
            mostrarProductos(carrito) 
            console.log("Subtotal: $"+sumarSubtotal(carrito))
            let finalizar = true
            if (finalizar === true){
                let metodoPago = parseInt(prompt("Ingrese el número del medio de pago que desee usar: \n 1-Tarjeta de crédito (10% de recargo) \n 2-Tarjeta de débito \n 3-Efectivo o transferencia (10% de descuento) \n 4-Cancelar compra"))
                switch (metodoPago){
                    case 1:
                        console.log("Medio de pago: Tarjeta de crédito")
                        console.log("Total a pagar: $"+recargo(sumarSubtotal(carrito), 10))
                        alert("Gracias por su compra")
                        break
                    case 2:
                        console.log("Medio de pago: Tarjeta de débito")
                        console.log("Total a pagar: $"+sumarSubtotal(carrito))
                        alert("Gracias por su compra")
                        break
                    case 3:
                        console.log("Medio de pago: Efectivo / transferencia")
                        console.log("Total a pagar: $"+descuento(sumarSubtotal(carrito), 10))
                        alert("Gracias por su compra")
                        break
                    case 4:
                        console.log("Compra cancelada")
                        alert("Hasta la próxima 👋😊")
                        break
                    default:
                        alert("Ingrese un número del 1 al 3")
                        break
                    }
                    if (metodoPago == 1 || metodoPago == 2 || metodoPago == 3 || metodoPago == 4){
                        finalizar = false
                    }
                }
        break
        default:
            alert("ingrese un número del 1 al 5")
        break
    }
    if (menu === 6){ 
        continuar = false
    }   
}
