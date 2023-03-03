// Client facing scripts here

$(document).ready(() => {
  // create menu article element given raw menu data
  const createCartElement = function(cartItem) {
    const menuElement = $(`
      <article class="cart-item">
        <div>PLACEHOLDER ITEM</div>
      </article>
    `);
    return menuElement;
  };

  // given array of tweets, append generated article element to tweets-container
  const renderCart = function(cartItems) {
    const $container = $(".cart-items");
    $container.empty();
    for (const item of cartItems) {
      const oneItem = createCartElement(item);
      $container.append(oneItem);
    }
  };

  // get request to /cart, render cart on success
  const loadCart = function() {
    $.ajax({
      url: '/cart',
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
