
class Producto {
    constructor(id, nombre, descripcion, precio, stock) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
    }

    restaStock() {
        this.stock = this.stock - 1;
    }
}

const producto0 = new Producto(0, "Cafe en grano Bonafide 1kg", "Paquete color negro, cafe tostado", 4425, 10);
const producto1 = new Producto(1, "Cafe molido Martinez 250g", "Tipo Italiano,fuerte", 1485, 15);
const producto2 = new Producto(2, "Cafe tostado molido Cabrales 260g", "Libre de gluten, sin T.A.C.C.", 1690, 20);
const producto3 = new Producto(3, "Combo Cafe en capsulas Martinez 60u",
    "Sabores: Vainilla,Avellana,Tipo Italiano,Moka,Brasil,Colombia", 8355, 10);
const producto4 = new Producto(4, "Cafe en capsulas Starbucks 20u",
    "Sabores: Espresso Roast, House Blend, Pike Place Roast, Blonde", 4499, 20);

const productos = [producto0, producto1, producto2, producto3, producto4];
const carrito = []

let productosOfrecidos = "Nuestros productos: "

function validarRespuesta(resp) {
    while (isNaN(resp)) {
        alert("Por favor, ingresá un número");
        respuesta = parseInt(prompt(productosOfrecidos));
    }
    return respuesta;
}

function agregarProducto() {
    for (item of productos) {
        productosOfrecidos += `\n\n - ID: ${item.id} - ${item.nombre} - ${item.descripcion}` +
            ` $${item.precio} `;
    }
    productosOfrecidos += "\n\n Ingresa el ID del producto que deseas agregar. \n Para finalizar, ingresa 00";

    let respuesta = parseInt(prompt(productosOfrecidos));

    while (!isNaN(respuesta)) {
        while (respuesta != 00) {
            switch (respuesta) {
                case 0:
                    carrito.push(productos[0]);
                    alert(`Se agregó el producto ${productos[0].nombre} al carrito`);
                    productos[0].restaStock();
                    break;
                case 1:
                    carrito.push(productos[1]);
                    alert(`Se agregó el producto ${productos[1].nombre} al carrito`);
                    productos[1].restaStock();
                    break;
                case 2:
                    carrito.push(productos[2]);
                    alert(`Se agregó el producto ${productos[2].nombre} al carrito`);
                    productos[2].restaStock();
                    break;
                case 3:
                    carrito.push(productos[3]);
                    alert(`Se agregó el producto ${productos[3].nombre} al carrito`);
                    productos[3].restaStock();
                    break;
                case 4:
                    carrito.push(productos[4]);
                    alert(`Se agregó el producto ${productos[4].nombre} al carrito`);
                    productos[4].restaStock();
                    break;
                case 5:
                    carrito.push(productos[5]);
                    alert(`Se agregó el producto ${productos[5].nombre} al carrito`);
                    productos[5].restaStock();
                    break;
                default:
                    alert("Lo siento, no tenemos el producto que ingresaste");
                    break;
            }
            respuesta = parseInt(prompt(productosOfrecidos));
        }
        alert("Tu carrito se guardó correctamente");
        mostrarCarrito();
        break;
    }
}

let productosCarrito = "Productos seleccionados: ";
let precioCarrito = 0;

function mostrarCarrito() {
    for (item of carrito) {
        productosCarrito += `\n - ${item.nombre}`;
        precioCarrito += item.precio;
    }

    alert(`Te llevarás los productos: \n ${productosCarrito} \n Por un total de: $${precioCarrito} `);
}

function crearProducto() {
    let validar = false;
    let nombre = "";
    let desc = "";
    let precio = 0;
    let stock = 0;

    do {
        nombre = prompt("Nombre del producto:");
        desc = prompt("Descripción del producto");
        precio = parseInt(prompt("Precio del prodcuto:"));
        stock = parseInt(prompt("Cantidad del prodcuto:"));

        if (nombre == "" || isNaN(precio) || isNaN(stock)) {
            validar = false;
            alert("Uno o más datos son erróneos, ingresalos nuevamente");
        } else {
            validar = true;
        }
    } while (validar === false)

    const productoManual = new Producto(5, nombre, desc, precio, stock);

    productos.push(productoManual);
    agregarProducto();
}

//pedirDatos();
//elegirMenu();
//elegirLocalidad();
crearProducto();




//variables del envío
let precioEnvio = 0
let subtotal = 0
let total = 0

//variables del cliente
let nombre
let direccion
let codigoLocalidad
let telefono
let mail

//variable de los productos
let seguirPidiendo
let codigoPedirNuevamente
let codigoMenu

let localidades


function elegirMenu() {

    do {
        codigoMenu = prompt("Ingresa el codigo del menu que quieras comprar" +
            "\n1- Desayuno Porteño $780 \n2- Desayuno Frances $1100" +
            "\n3- Desayuno Saludable $1450 \n4- Desayuno Americano $1920")

        if (codigoMenu === '1') {
            //Desayuno Porteño
            subtotal = subtotal + 780
        } else if (codigoMenu === '2') {
            //Desayuno Frances
            subtotal = subtotal + 1100
        } else if (codigoMenu === '3') {
            //Desayuno Saludable
            subtotal = subtotal + 1450
        } else if (codigoMenu === '4') {
            //Desayuno Americano
            subtotal = subtotal + 1920
        } else {
            alert("Disculpá, el dato que ingresaste no es correcto")
        }

        codigoPedirNuevamente = prompt("¿Deseas seguir pidiendo otro menú?" +
            "\n1-SI \n2-NO");

        if (codigoPedirNuevamente === '1') {
            seguirPidiendo = true;
        } else {
            seguirPidiendo = false;
            alert("Gracias, el total de tu compra es de: $" + subtotal);
        }

    } while (seguirPidiendo === true)
}

function elegirLocalidad() {
    codigoLocalidad = prompt("Ingresá tu código de localidad" +
        "\n1- Capital Federal \n2- Zona Norte \n3- Zona Oeste")

    if (codigoLocalidad === '1') {
        alert("Vivís en Capital Federal")
    } else if (codigoLocalidad === '2') {
        alert("Vivís en Zona Norte")
    } else if (codigoLocalidad === '3') {
        alert("Vivís en Zona Oeste")
    } else {
        alert("Disculpá, el dato que ingresaste no es correcto")
    }
}

function pedirDatos() {
    nombre = prompt("Ingresá tu nombre")
    direccion = prompt("Ingresá tu dirección")
    telefono = prompt("Ingresá tu teléfono")
    mail = prompt("Ingresá tu mail")

    alert("Gracias " + nombre +
        ", tus datos fueron cargados correctamente.")
}



