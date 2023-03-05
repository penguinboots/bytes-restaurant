const db = require('../connection');

const Utils = {};
Utils.isObject = x => x !== null && typeof x === "object";
Utils.isObjEmpty = obj => Utils.isObject(obj) && Object.keys(obj).length === 0;

// GET /orders
const getOrders = () => {
  return db.query(`SELECT * FROM orders
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
  const queryString = `SELECT * FROM orders WHERE customer_id = $1;`;
  const values = [customerId];
  return db.query(queryString, values)
    .then(data => data.rows);
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


module.exports = { getOrders, getOrdersMenu, getOrdersbyCustomerId, createOrder, updateOrders };
