// Client facing scripts here

$(document).ready(() => {


  // create menu article element given raw menu data
  const createCartElement = function(cartItem) {
    const menuElement = $(`
      <article class="item">
            <div class="about">
              <img
                src="https://dummyimage.com/50x50/ffe4c4/000000.jpg&text=${cartItem.name}"
              />
              <h1 class="item-title">${cartItem.name}</h1>
            </div>
            <div class="mod-item">
              <div>$${(cartItem.price / 100 * cartItem.quantity).toFixed(2)}</div>
              <div class="counter">
                <form class="item-decrease">
                  <input
                    name="cartItemId"
                    value="${cartItem.id}"
                    type="hidden"
                  />
                  <button type="submit">-</button>
                </form>
                <div class="count">${cartItem.quantity}</div>
                <form class="item-increase">
                  <input
                    name="cartItemId"
                    value="${cartItem.id}"
                    type="hidden"
                  />
                  <button type="submit">+</button>
                </form>
              </div>
              <form class="remove-item">
                <input name="cartItemId" value="${cartItem.id}" type="hidden" />
                <button class="remove-item" type="submit">Remove</button>
              </form>
            </div>
          </article>
    `);
    return menuElement;
  };

  // create subtotal element given cart data
  const createSubtotal = function(cart) {
    let subtotal = 0;
    for (const item of cart) {
      subtotal += item.price * item.quantity / 100;
    }

    const subtotalElement = $(`
    <div class="subtotal">
      SUBTOTAL: $${subtotal.toFixed(2)}
    </div>
    `);

    return subtotalElement;
  };

  // given array of items, append generated article element to cart-items-container
  // append subtotal of cart items
  const renderCart = function(cart) {
    const $container = $(".cart-items-container");
    $container.empty();

    if (emptyCart(cart)) {
      $container.append(emptyMessage());
    }

    for (const item of cart) {
      if (item.quantity !== 0) {
        const oneItem = createCartElement(item);
        $container.append(oneItem);
      }
    }

    $container.append(createSubtotal(cart));
  };

  // count total items in cart
  const emptyCart = function(cart) {
    let count = 0;
    for (const item of cart) {
      if (item.quantity) {
        count += item.quantity;
      }
    }
    if (!count) {
      return true;
    } else {
      return false;
    }
  };

  // generate empty cart message
  const emptyMessage = () => {
    return $(`
    <i class="fa-solid fa-cart-shopping"></i>
    <h2 class="empty-message">YOUR CART IS EMPTY!</h2>
    `);
  };

  // get request to /cart, render cart on success
  const loadCart = function() {
    $.ajax({
      url: '/api/cart',
      method: 'GET',
      success: (cart) => {
        renderCart(cart);
      },
      error: (error) => {
        console.error(error);
      }
    });
  };

  loadCart();

  // handler for adding new item to cart
  // sends itemId, itemName, itemPrice
  $(".form-add-item").submit(function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();

    console.log(serializedData);

    $.post("/api/cart/add", serializedData)
      .then(() => {
        loadCart();
      });
  });

  // handlers for decreasing/increasing quantity and removing item from cart
  // sends cartItemId
  $(document.body).on('submit', '.item-decrease', function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();

    $.post("/api/cart/decrease", serializedData)
      .then(() => {
        loadCart();
      });
  });

  $(document.body).on('submit', '.item-increase', function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();

    $.post("/api/cart/increase", serializedData)
      .then(() => {
        loadCart();
      });
  });

  $(document.body).on('submit', '.remove-item', function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();

    $.post("/api/cart/remove", serializedData)
      .then(() => {
        loadCart();
      });
  });
});
