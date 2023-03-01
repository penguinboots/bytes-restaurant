const db = require('../connection');

// GET /orders
const getOrders = () => {
  return db.query('SELECT * FROM orders;')
    .then(data => data.rows);
};

// GET /orders/menu
const getOrdersMenu = (customerId) => {
  const queryString = `select orders.*, menu_items.* from orders
  join order_items on order_id = orders.id
  join menu_items on menu_items_id = menu_items.id
  where customer_id = $1;`;
  const values = [customerId];
  return db.query(queryString, values)
    .then(data => data.rows);
};

// GET /orders/users

const getOrdersbyCustomerId = (customerId) => {
  const queryString = `SELECT * FROM orders WHERE customer_id = $1;`;
  const values = [customerId];
  return db.query(queryString, values)
    .then(data => data.rows);
};

module.exports = { getOrders, getOrdersMenu, getOrdersbyCustomerId };
