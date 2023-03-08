const db = require('../connection');
const Utils = require('../helpers/utils');

// GET /orders
const getOrders = () => {
  return db.query(`SELECT orders.id, orders.customer_id, status.status as status, total, created_at, accepted_at, estimated_end_time, completed_at FROM orders
  JOIN status ON orders.status = status.id
  ORDER BY status.id ASC;`)
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
  const queryString = `SELECT orders.id AS id, orders.customer_id AS customer_id, status.status AS status, orders.total AS total, 
  orders.created_at AS created_at, orders.accepted_at AS accepted_at, orders.estimated_end_time AS estimated_end_time, orders.completed_at AS completed_at
   FROM orders JOIN status ON orders.status = status.id WHERE customer_id = $1;`;
  const values = [customerId];
  return db.query(queryString, values)
    .then(data => data.rows);
};

const acceptOrder = (orderId, estimatedTime) => {

  const now = new Date();
  const queryString = `UPDATE orders SET estimated_end_time = $1, accepted_at = $2, status = 2 WHERE id = $3 RETURNING *;`;
  const values = [estimatedTime, now.toISOString().replace(/\.\d+Z$/, '').replace('T', ' '), orderId];
  return db.query(queryString, values)
    .then(data => data.rows);
};

const rejectOrder = (orderId) => {

  const queryString = `UPDATE orders SET status = 4 WHERE id = $1 RETURNING *;`;
  const values = [orderId];
  return db.query(queryString, values)
    .then(data => data.rows);
};

const completeOrder = (orderId, completedTime) => {

  const queryString = `UPDATE orders SET status = 3, completed_at = $2 WHERE id = $1 RETURNING *;`;
  const values = [orderId, completedTime];
  return db.query(queryString, values)
    .then(data => data.rows);
};



// GET /orders/users

const getOrderById = (orderId) => {
  const queryString = `SELECT orders.id AS id, orders.customer_id AS customer_id, status.status AS status, orders.total AS total, 
  orders.created_at AS created_at, orders.accepted_at AS accepted_at, orders.estimated_end_time AS estimated_end_time, orders.completed_at AS completed_at,
  menu_items.name AS name, menu_items.price AS price, order_items.quantity AS quantity FROM orders
  JOIN order_items ON orders.id = order_items.order_id
  JOIN menu_items ON order_items.menu_items_id = menu_items.id
  JOIN status ON status.id = orders.status
  WHERE orders.id = $1;`;
  const values = [orderId];
  return db.query(queryString, values)
    .then(data => data.rows[0]);
};

/** POST /orders from cart_items
 * params: {
 *  customer_id: cart_items.user_id
 *  status: integer ref(status),
 *  total: cart_items.quantity * cart_items.price,
 * }
 */
const createOrder = (params) => {
  const queryString = `INSERT INTO orders (customer_id, status, total) VALUES ($1, $2, $3) RETURNING *;`;
  const values = [params.customer_id, params.status, params.total];
  return db.query(queryString, values)
    .then(data => data.rows[0]);
};


/** UPDATE /orders
 * tableName: `orders`
 * conditions: { id: orders.id }
 * data: { status: integer ref(status) }
 *
 *  "UPDATE orders SET field_1 = $1, field_2 = $2, field_3 = $3, ... ( WHERE ...) RETURNING *";
 */

const updateOrders = (conditions, data) => {
  const dKeys = Object.keys(data);
  const dataTuples = dKeys.map((k, index) => `${k} = $${index + 1}`);
  const updates = dataTuples.join(", ");
  const len = Object.keys(data).length;

  let queryString = `UPDATE menu_items SET ${updates} `;

  if (!Utils.isObjEmpty(conditions)) {
    const keys = Object.keys(conditions);
    const condTuples = keys.map((k, index) => `${k} = $${index + 1 + len} `);
    const condPlaceholders = condTuples.join(" AND ");

    queryString += ` WHERE ${condPlaceholders} RETURNING *`;
  }

  const values = [];
  Object.keys(data).forEach(key => {
    values.push(data[key]);
  });
  Object.keys(conditions).forEach(key => {
    values.push(conditions[key]);
  });

  console.log(queryString, values);

  return db.query(queryString, values)
    .then(data => data.rows[0]);
};


module.exports = { getOrders, getOrdersMenu, getOrdersbyCustomerId, createOrder, updateOrders, getOrderById, acceptOrder, rejectOrder, completeOrder };
