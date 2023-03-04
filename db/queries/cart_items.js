const db = require('../connection');

//utilities
const Utils = {};
Utils.isObject = x => x !== null && typeof x === "object";
Utils.isObjEmpty = obj => Utils.isObject(obj) && Object.keys(obj).length === 0;

// GET /orders/menu
const getCartItembyUserID = (userID) => {
  const queryString = `
    SELECT cart_items.id, name, price, quantity FROM cart_items join menu_items on menu_items.id = item_id where customer_id = $1;
  `;
  const values = [userID];
  return db.query(queryString, values)
    .then(data => data.rows);
};

/** POST /carts
 * params: {
 *  item_id: integer ref(menu_items),
 *  user_id: integer ref(users),
 *  quantity: 4.5,
 * }
 */
const createCartItem = (params) => {
  const queryString = `INSERT INTO cart_items (item_id, user_id, quantity) VALUES ($1, $2, $3) RETURNING *;`;
  const values = [params.item_id, params.user_id, params.quantity];
  return db.query(queryString, values)
    .then(data => data.rows[0]);
};

/**
 * tableName: `cart_items`
 * conditions: { user_id, item_id ref (menu_items id) }
 * data: { quantity: integer }
 *
 *  "UPDATE cart_items SET quantity = 2 where item_id = 3 and user_id = 2 RETURNING *";
 */

const updateCartItems = (conditions, data) => {

  const dKeys = Object.keys(data);
  const dataTuples = dKeys.map((k, index) => `${k} = $${index + 1}`);
  const updates = dataTuples.join(", ");
  const len = Object.keys(data).length;

  let queryString = `UPDATE cart_items SET ${updates} `;

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

module.exports = { getCartItembyUserID, createCartItem, updateCartItems };