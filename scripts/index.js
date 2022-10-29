
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

//pedirDatos();
elegirMenu();
//elegirLocalidad();

function elegirMenu() {

    do {
        codigoMenu = prompt("Ingresa el codigo del menu que quieras comprar" +
            "\n1- Desayuno Porteño $780 \n2- Desayuno Frances $1100" +
            "\n3- Desayuno Saludable $1450 \n4- Desayuno Americano $1920")

        if (codigoMenu == '1') {
            //Desayuno Porteño
            subtotal = subtotal + 780
        } else if (codigoMenu == '2') {
            //Desayuno Frances
            subtotal = subtotal + 1100
        } else if (codigoMenu == '3') {
            //Desayuno Saludable
            subtotal = subtotal + 1450
        } else if (codigoMenu == '4') {
            //Desayuno Americano
            subtotal = subtotal + 1920
        } else {
            alert("Disculpá, el dato que ingresaste no es correcto")
        }

        codigoPedirNuevamente = prompt("¿Deseas seguir pidiendo otro menú?" +
            "\n1-SI \n2-NO");

        if (codigoPedirNuevamente == '1') {
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

    if (codigoLocalidad == '1') {
        alert("Vivís en Capital Federal")
    } else if (codigoLocalidad == '2') {
        alert("Vivís en Zona Norte")
    } else if (codigoLocalidad == '3') {
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
