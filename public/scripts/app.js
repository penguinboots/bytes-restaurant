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
              <div>${cartItem.price}</div>
              <div class="counter">
                <button>-</button>
                <div class="count">${cartItem.quantity}</div>
                <button>+</button>
              </div>
              <form action="/cart" method="POST">
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
  const loadCart = function(cart_item) {
    $.ajax({
      url: '/api/cart',
      method: 'GET',
      success: (cart) => {
        if (cart_item) {
          cart.push(cart_item);
        }
        renderCart(cart);
      },
      error: (error) => {
        console.error(error);
      }
    });
  };

  loadCart();


  $(".form-add-item").submit(function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();

    $.post("/api/cart/add", serializedData)
      .then((cart_item) => {
        console.log("data sent");
        loadCart(cart_item);
      });
  });
});
