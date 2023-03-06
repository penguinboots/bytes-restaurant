const db = require('../connection');
const Utils = require('../helpers/utils');

// GET /menu
const getFullMenu = () => {
  return db.query('SELECT * FROM menu_items;')
    .then(data => data.rows);
};

// GET /menu/:id
const getMenu = (id) => {
  const queryString = `SELECT * FROM menu_items WHERE id = $1;`;
  const values = [id];
  return db.query(queryString, values)
    .then(data => data.rows);
};

/** POST /menu
 *
 * params: {
 *  name: str,
 *  description: str,
 *  price: money,
 *  image_url: str
 * }
 */
const createMenu = (params) => {
  const queryString = `INSERT INTO menu_items ( name, description, price, image_url) VALUES ($1, $2, $3, $4) RETURNING *;`;
  const values = [params.name, params.description, params.price, params.image_url];
  return db.query(queryString, values)
    .then(data => data.rows[0]);
};

/**
 * tableName: `menu`
 * conditions: { id: 'menu_item_id: 3', ... }
 * data: { price: 299 }
 *
 *  "UPDATE menu_items SET field_1 = $1, field_2 = $2, field_3 = $3, ... ( WHERE ...) RETURNING *";
 */

const updateMenu = (conditions, data) => {
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


module.exports = { getFullMenu, getMenu, createMenu, updateMenu };
