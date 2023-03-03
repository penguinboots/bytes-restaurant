// Client facing scripts here

$(document).ready(() => {
  // create menu article element given raw menu data
  const createCartElement = function(cartItem) {
    const menuElement = $(`
      <article class="cart-item">
        <div>${cartItem.name}</div>
        <div>${cartItem.price}</div>
        <div>${cartItem.quantity}</div>
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

});
