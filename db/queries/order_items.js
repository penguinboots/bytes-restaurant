const db = require('../connection');

/**
 * PLACEHOLDER QUERY FOR THE SAKE OF TESTING (NOT FINAL)
 * params: { 
 *  order_id: integer ref(orders)
 *  cart: cart object
 * }
 * 
 */
const createOrderItems = (params) => {
  const dataTuples = params.cart.map((k) => `(${params.order_id}, ${k["item_id"]}, ${k.quantity})`);
  const val = dataTuples.join(',');
  let queryString = `INSERT INTO order_items (order_id, menu_items_id, quantity) VALUES `;
  queryString += val;
  queryString += ` RETURNING *;`;
  return db.query(queryString)
    .then(data => data.rows);
};

module.exports = { createOrderItems };