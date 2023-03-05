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

  // given array of tweets, append generated article element to tweets-container
  const renderCart = function(cart) {
    const $container = $(".cart-items-container");
    $container.empty();
    for (const item of cart) {
      const oneItem = createCartElement(item);
      $container.append(oneItem);
    }
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

    $.post("/api/cart/mod", serializedData)
      .then(() => {
        loadCart();
      });
  });

  $(document.body).on('submit', '.item-increase', function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();

    $.post("/api/cart/mod", serializedData)
      .then(() => {
        loadCart();
      });
  });

  $(document.body).on('submit', '.remove-item', function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();

    $.post("/api/cart/mod", serializedData)
      .then(() => {
        loadCart();
      });
  });
});
