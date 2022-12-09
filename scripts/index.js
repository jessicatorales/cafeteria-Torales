
class Producto {
    constructor(id, nombre, descripcion, precio, imagen, stock) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen;
        this.stock = stock;
    }

    restaStock() {
        this.stock = this.stock - 1;
    }
}

class Carrito {
    constructor() {
        this.id = id,
            this.nombre = nombre,
            this.cantidad = cantidad
    }
}

let productos = setearProductos();
localStorage.setItem("productos", JSON.stringify(productos))

let infoProductos = JSON.parse(localStorage.getItem("productos"))
let divProducto = document.getElementById("div__categoria")

infoProductos.forEach(p => {
    divProducto.innerHTML +=
        `
    <div class="div__producto">
        <img class="img__producto" src="${p.imagen}">
        <p class="p__producto__texto">${p.nombre}</p>
        <p class="p__producto__precio">$ ${p.precio}</p>
        <button id=${p.id} class="btn__producto">AGREGAR AL CARRITO</button>
    </div>
    `
});

let precioTotal = 0
const carrito = []
let productosEnCarrito = []

let divBody = document.getElementById("div__body")
let divCard = document.getElementById("div__card")
let btnFinalizar = document.getElementById("btn__comprar")
localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito))

function agregarProducto() {
    divProducto.onclick = (e) => {
        let _id = parseInt(e.target.id)
        let productoElegido = productos.find(p => p.id === _id)
        let temp = carrito.includes(productoElegido)
        Toastify({
            text: `El producto ${productoElegido.nombre} fue agregado al carrito`,
            duration: 3000,
            style: {
                background: "#000"
            }
        }).showToast();

        if (temp) {
            productosEnCarrito = JSON.parse(localStorage.getItem("productosEnCarrito"))
            let temp = productosEnCarrito.find(p => p.id === _id)
            temp.cantidad = temp.cantidad + 1
            localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito))
            return productosEnCarrito
        } else {
            carrito.push(productoElegido)
            productosEnCarrito = JSON.parse(localStorage.getItem("productosEnCarrito"))
            let productoAMostrar = { "id": _id, "nombre": productoElegido.nombre, "cantidad": 1 }
            productosEnCarrito.push(productoAMostrar)
            localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito))
        }
        precioTotal += productoElegido.precio
        localStorage.setItem("total", precioTotal)
    }
}

function terminarCompra() {
    btnFinalizar.onclick = () => {
        precioTotal = localStorage.getItem("total")
        divBody.innerHTML = `
            <div id="div__listado">
                <h1 id="titulo">CARRITO</h1>
            </div>
            <div id="div__total"></div>
            `
        let divListado = document.getElementById("div__listado")
        let divTotal = document.getElementById("div__total")
        productosEnCarrito.forEach(p => {
            console.log(p)
            divListado.innerHTML += `<p class="h1">- ${p.nombre} (x${p.cantidad}) </p>`
        })
        divTotal.innerHTML += `
        <p class= "h2">Total: $${precioTotal}</p> 
        <button id="btnFinalizar">Comprar</button>`

        let btnFinalizar = document.getElementById("btnFinalizar")


        btnFinalizar.onclick = () => {
            location.reload()
        }

        localStorage.clear()
        b = 0
        precioTotal = 0
        carrito = []
    }
}

function setearProductos() {
    const producto0 = new Producto(0, "Cafe en grano Bonafide 1kg", "Paquete color negro, cafe tostado", 4425, "../assets/cafeengrano1.jpg", 10);
    const producto1 = new Producto(1, "Cafe molido Martinez 250g", "Tipo Italiano,fuerte", 1485, "../assets/cafeengrano3.jpg", 15);
    const producto2 = new Producto(2, "Cafe tostado molido Cabrales 260g", "Libre de gluten, sin T.A.C.C.", 1690, "../assets/cafemolido1.jpg", 20);
    const producto3 = new Producto(3, "Combo Cafe en capsulas Martinez 60u",
        "Sabores: Vainilla,Avellana,Tipo Italiano,Moka,Brasil,Colombia", 8355, "../assets/capsulasdecafe1.jpg", 10);
    const producto4 = new Producto(4, "Cafe en capsulas Starbucks 20u",
        "Sabores: Espresso Roast, House Blend, Pike Place Roast, Blonde", 4499, "../assets/capsulasdecafe2.jpg", 20);
    const producto5 = new Producto(5, "Cafetera Moka Pedrini", "Negro Infinity para 6 posillos", 23053, "../assets/cafetera1.jpg", 5)
    const producto6 = new Producto(6, "Moka Pedrini Alumini", "Rojo para 3 posillos", 12753, "../assets/cafetera2.jpg", 8 );
    const producto7 = new Producto(7, "Jarra medidora 350ml", "Negra Acero Inoxidable", 6540, "../assets/jarramedidora1.jpg", 10);
    const producto8 = new Producto(8, "Porta Cápsulas", "x24", 3902, "../assets/portacapsulas.jpg", 5);
    const producto9 = new Producto(9, "Jarra Térmica Sakura", "Style Negra", 10692, "../assets/jarratermica3.jpg", 20);

    let productos = []
    productos.push(producto0);
    productos.push(producto1);
    productos.push(producto2);
    productos.push(producto3);
    productos.push(producto4);
    productos.push(producto5);
    productos.push(producto6);
    productos.push(producto7);
    productos.push(producto8);
    productos.push(producto9);

    return productos;
}
agregarProducto();
terminarCompra();
