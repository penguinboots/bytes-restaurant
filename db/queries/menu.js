const db = require('../connection');
//utilities
const Utils = {};
Utils.isObject = x => x !== null && typeof x === "object";
Utils.isObjEmpty = obj => Utils.isObject(obj) && Object.keys(obj).length === 0;

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
// POST /menu
const createMenu = (params) => {
  const params1 = {
    name: 'Latte',
    description: 'Made of a shot of espresso, whole milk, and sweetened condensed milk',
    price: 4.5,
    image_url: 'https://www.hsph.harvard.edu/wp-content/uploads/sites/30/2019/02/caffeine-close-up-coffee-539432-1200x800.jpg'
  };
  const queryString = `INSERT INTO menu_items ( name, description, price, image_url) VALUES ($1, $2, $3, $4) RETURNING *;`;
  const values = [params1.name, params1.description, params1.price, params1.image_url];
  return db.query(queryString, values)
    .then(data => data.rows[0]);
};

/**
 * tableName: `menu`
 * conditions: { id: 'menu_item_id: 3', ... }
 * data: { price: 299 }
 *
 *  "UPDATE users SET field_1 = $1, field_2 = $2, field_3 = $3, ... ( WHERE ...) RETURNING *";
 */

const updateMenu = (conditions, data) => {
  const conditions1 = {id: 3};
  const data1 = { price: 500};

  const dKeys = Object.keys(data1);
  const dataTuples = dKeys.map((k, index) => `${k} = $${index + 1}`);
  const updates = dataTuples.join(", ");
  const len = Object.keys(data1).length;

  let queryString = `UPDATE menu_items SET ${updates} `;

  if (!Utils.isObjEmpty(conditions1)) {
    const keys = Object.keys(conditions1);
    const condTuples = keys.map((k, index) => `${k} = $${index + 1 + len} `);
    const condPlaceholders = condTuples.join(" AND ");

    queryString += ` WHERE ${condPlaceholders} RETURNING *`;
  }

  const values = [];
  Object.keys(data1).forEach(key => {
    values.push(data1[key]);
  });
  Object.keys(conditions1).forEach(key => {
    values.push(conditions1[key]);
  });

  console.log(queryString, values);

  return db.query(queryString, values)
    .then(data => data.rows[0]);
};


module.exports = { getFullMenu, getMenu, createMenu, updateMenu };
