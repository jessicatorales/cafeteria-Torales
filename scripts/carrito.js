let lblCarrito = document.getElementById("lbl__carrito");
let div__carrito = document.getElementById("div__carrito");

let productos = JSON.parse(localStorage.getItem("productos"));
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let calcularCarrito = () => {
  let carritoIcon = document.getElementById("carritoAmount");
  carritoIcon.innerHTML = carrito.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calcularCarrito();

let generarItemsCarrito = () => {
  if (carrito.length !== 0) {
    return (div__carrito.innerHTML = carrito
      .map((x) => {
        let { id, item } = x;
        let search = productos.find((y) => y.id === id) || [];
        return `
        <div class="carrito__item">
          <img width="200px" src=${search.imagen} alt="" />
          <div class="details">
            <div class="title-precio-x">
                <h4 class="title-precio">
                  <p>${search.nombre}</p>
                  <p class="carrito__item__precio">$ ${search.precio}</p>
                </h4>
                <i onclick="removeItem(${id})" class="bi bi-x-lg" style="
                    background-color: #212529;
                    color: red;
                    margin: 10px;">
                </i>
            </div>

            <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">${item}</div>
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>

            <h3>$ ${item * search.precio}</h3>
          </div>
        </div>
      `;
      })
      .join(""));
  } else {
    div__carrito.innerHTML = ``;
    lblCarrito.innerHTML = `
    <h2>Tu carrito esta vacio, ve a productos para agregar</h2>
    <a href="../pages/productos.html">
      <button class="btn__producto">Volver a Productos</button>
    </a>
    `;
  }
};

generarItemsCarrito();

let increment = (id) => {
  let selectedItemId = id;
  let search = carrito.find((x) => x.id === selectedItemId);

  if (search === undefined) {
    carrito.push({
      id: selectedItemId,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  Toastify({
    text: 'Has agregado un producto al Carrito'
  }).showToast()

  generarItemsCarrito();
  actualizarItems(selectedItemId);
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

let decrement = (id) => {
  let selectedItemId = id;
  let search = carrito.find((x) => x.id === selectedItemId);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  Toastify({
    text: 'Has restado un producto al Carrito'
  }).showToast()
  actualizarItems(selectedItemId);
  carrito = carrito.filter((x) => x.item !== 0);
  generarItemsCarrito();
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

let actualizarItems = (id) => {
  let search = carrito.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calcularCarrito();
  calcularMontoTotal();
};

let removeItem = (id) => {
  let selectedItemId = id;
  carrito = carrito.filter((x) => x.id !== selectedItemId);
  Toastify({
    text: 'Has eliminado por completo un producto del Carrito'
  }).showToast()
  generarItemsCarrito();
  calcularMontoTotal();
  localStorage.setItem("carrito", JSON.stringify(carrito));
  calcularCarrito();
};

let limpiarCarrito = () => {
  carrito = [];
  generarItemsCarrito();
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

let realizarCompra = () => {
  let amount = carrito
    .map((x) => {
      let { item, id } = x;
      let search = productos.find((y) => y.id === id) || [];

      return item * search.precio;
    })
    .reduce((x, y) => x + y, 0);
  div__carrito.innerHTML = ``;
  lblCarrito.innerHTML = `
      <h2>Tu compra se ha enviado exitosamente!</h2>
      <h2>El monto total es de $${amount}</h2>
      <h4>Para volver a nuestros productos, haz clic en el boton de abajo</h3>
      <a href="../pages/productos.html">
        <button class="btn__producto" onclick="limpiarCarrito()">Volver</button>
      </a>
    `;
}

let calcularMontoTotal = () => {
  if (carrito.length !== 0) {
    let amount = carrito
      .map((x) => {
        let { item, id } = x;
        let search = productos.find((y) => y.id === id) || [];

        return item * search.precio;
      })
      .reduce((x, y) => x + y, 0);
    lblCarrito.innerHTML = `
    <h2>Monto Total : $ ${amount}</h2>
    <button class="btn__Checkout" onclick="realizarCompra()">Comprar</button>
    <button  class="btn__RemoveAll" onclick="limpiarCarrito()">Limpiar Carrito</button>
    `;
  } else return;
};

calcularMontoTotal();