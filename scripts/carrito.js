let lblCarrito = document.getElementById("lbl__carrito");
let div__carrito = document.getElementById("div__carrito");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let carritoIcon = document.getElementById("carritoAmount");
  carritoIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generatecarritoItems = () => {
  if (basket.length !== 0) {
    return (div__carrito.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        return `
      <div class="carrito-item">
        <img width="100" src=${search.img} alt="" />
        <div class="details">

          <div class="title-precio-x">
              <h4 class="title-precio">
                <p>${search.name}</p>
                <p class="carrito-item-precio">$ ${search.precio}</p>
              </h4>
              <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
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
    <h2>Tu carrito está vacio, ve a productos para agregar</h2>
    <a href="../pages/productos.html">
      <button class="btn__producto">Volver a Productos</button>
    </a>
    `;
  }
};

generatecarritoItems();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  generatecarritoItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generatecarritoItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  MontoTotal();
};

let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generatecarritoItems();
  MontoTotal();
  localStorage.setItem("data", JSON.stringify(basket));
};

let limpiarcarrito = () => {
  basket = [];
  generatecarritoItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let MontoTotal = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { item, id } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];

        return item * search.precio;
      })
      .reduce((x, y) => x + y, 0);
    // console.log(amount);
    lblCarrito.innerHTML = `
    <h2>Monto Total : $ ${amount}</h2>
    <button class="checkout">Comprar</button>
    <button onclick="limpiarcarrito()" class="removeAll">Limpiar Carrito</button>
    `;
  } else return;
};

MontoTotal();