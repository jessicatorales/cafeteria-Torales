
class Producto {
    constructor(id, nombre, descripcion, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen;
    }
}

let productos = setearProductos();
localStorage.setItem("productos", JSON.stringify(productos));

let infoProductos = JSON.parse(localStorage.getItem("productos"));
let divProducto = document.getElementById("div__categoria");

let precioTotal = 0;
let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

let generarProductos = () => {
    return (divProducto.innerHTML = infoProductos
        .map((x) => {
            let { id, nombre, precio, descripcion, imagen } = x;
            let search = productosEnCarrito.find((x) => x.id === id) || [];
            return `
            <div id=product-id-${id} class="div__producto">
                <img class="img__producto" src=${imagen} alt="">
                <div class="details">
                    <p class="p__producto__texto">${nombre}</p>  
                    <p class="p__producto__precio">$ ${precio}</p>
                        <div class="precio-quantity">            
                            <div class="buttons">
                                <i onclick="restarStock(${id})" class="bi bi-dash-square-fill"></i>
                                <div id=${id} class="quantity">
                                    ${search.item === undefined ? 0 : search.item}
                                </div>
                                <i onclick="sumarStock(${id})" class="bi bi-plus-square-fill"></i>
                            </div>
                        </div>
                </div>
            </div>
        `;
        })
        .join(""));
};

let generarListaProductos = () => {
    let { id, name, desc, precio, img } = x;
    let search = productos.find((x) => x.id === id) || [];
    infoProductos.forEach(p => {
        divProducto.innerHTML +=
            `
        <div class="div__producto">
            <img class="img__producto" src="${p.imagen}">
            <p class="p__producto__texto">${p.nombre}</p>
            <p class="p__producto__precio">$ ${p.precio}</p>
            <div class="buttons">
                  <i onclick="restarStock(${p.id})" class="bi bi-dash-square-fill"></i>
                  <div id=${p.id} class="quantity">
                  ${search.item === undefined ? 0 : search.item}
                  </div>
                  <i onclick="sumarStock(${p.id})" class="bi bi-plus-square-fill"></i>
                </div>
        </div>
        `
    });
}

let btnFinalizar = document.getElementById("btn__comprar")
localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))

btnFinalizar.onclick = function () {
    location.href = "../pages/carrito.html";
};

function setearProductos() {
    const producto0 = new Producto(0, "Cafe en grano Bonafide 1kg", "Paquete color negro, cafe tostado", 4425, "../assets/cafeengrano1.jpg");
    const producto1 = new Producto(1, "Cafe molido Martinez 250g", "Tipo Italiano,fuerte", 1485, "../assets/cafeengrano3.jpg");
    const producto2 = new Producto(2, "Cafe tostado molido Cabrales 260g", "Libre de gluten, sin T.A.C.C.", 1690, "../assets/cafemolido1.jpg");
    const producto3 = new Producto(3, "Combo Cafe en capsulas Martinez 60u",
        "Sabores: Vainilla,Avellana,Tipo Italiano,Moka,Brasil,Colombia", 8355, "../assets/capsulasdecafe1.jpg");
    const producto4 = new Producto(4, "Cafe en capsulas Starbucks 20u",
        "Sabores: Espresso Roast, House Blend, Pike Place Roast, Blonde", 4499, "../assets/capsulasdecafe2.jpg");
    const producto5 = new Producto(5, "Cafetera Moka Pedrini", "Negro Infinity para 6 posillos", 23053, "../assets/cafetera1.jpg")
    const producto6 = new Producto(6, "Moka Pedrini Alumini", "Rojo para 3 posillos", 12753, "../assets/cafetera2.jpg");
    const producto7 = new Producto(7, "Jarra medidora 350ml", "Negra Acero Inoxidable", 6540, "../assets/jarramedidora1.jpg");
    const producto8 = new Producto(8, "Porta Cápsulas", "x24", 3902, "../assets/portacapsulas.jpg");
    const producto9 = new Producto(9, "Jarra Térmica Sakura", "Style Negra", 10692, "../assets/jarratermica3.jpg");

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
let sumarStock = (id) => {
    let selectedItem = id;
    let search = productosEnCarrito.find((x) => x.id === selectedItem);

    if (search === undefined) {
        productosEnCarrito.push({
            id: selectedItem,
            item: 1,
        });
    } else {
        search.item += 1;
    }

    Toastify({
        text: 'Has agregado un producto al carrito'
    }).showToast()

    actualizarProducto(selectedItem);
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
};

let restarStock = (id) => {
    let selectedItem = id;
    let search = productosEnCarrito.find((x) => x.id === selectedItem);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    Toastify({
        text: 'Has restado un producto del carrito'
    }).showToast()
    actualizarProducto(selectedItem);
    productosEnCarrito = productosEnCarrito.filter((x) => x.item !== 0);
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
};

let actualizarProducto = (id) => {
    let search = productosEnCarrito.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calcularCantidadCarrito();
};

let calcularCantidadCarrito = () => {
    let carritoIcon = document.getElementById("carritoAmount");
    carritoIcon.innerHTML = productosEnCarrito.map((x) => x.item).reduce((x, y) => x + y, 0);
};

generarProductos();
calcularCantidadCarrito();
terminarCompra();