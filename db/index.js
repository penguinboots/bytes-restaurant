//? I realize this is a crude solution for getting the queries and connection together, but it's just to get a test run going
const { getUsers } = require('./queries/users');
const { getFullMenu, getMenu, createMenu, updateMenu } = require('./queries/menu');
const { getOrders, getOrdersMenu, getOrdersbyCustomerId } = require('./queries/orders');

module.exports = {
  getUsers,
  getFullMenu,
  getMenu,
  createMenu,
  updateMenu,
  getOrders,
  getOrdersMenu,
  getOrdersbyCustomerId
};
