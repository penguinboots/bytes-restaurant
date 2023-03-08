//? I realize this is a crude solution for getting the queries and connection together, but it's just to get a test run going
const { getUsers, getUser } = require('./queries/users');
const { getFullMenu, getMenu, createMenu, updateMenu } = require('./queries/menu');
const { getOrders, getOrdersMenu, getOrdersbyCustomerId, createOrder, updateOrders, getOrderById, acceptOrder, rejectOrder } = require('./queries/orders');
const { getCartItemsbyUserID, createCartItem, updateCartItems, getQuantityInCart, updateCartQuantities } = require('./queries/cart_items');
const { createOrderItems, getOrderItemsByOrderId } = require('./queries/order_items');

module.exports = {
  getUsers,
  getUser,
  getFullMenu,
  getMenu,
  createMenu,
  updateMenu,
  getOrders,
  getOrdersMenu,
  getOrdersbyCustomerId,
  acceptOrder,
  rejectOrder,
  createOrder,
  updateOrders,
  getOrderById,
  getCartItemsbyUserID,
  createCartItem,
  updateCartItems,
  getQuantityInCart,
  updateCartQuantities,
  createOrderItems,
  getOrderItemsByOrderId,
};
