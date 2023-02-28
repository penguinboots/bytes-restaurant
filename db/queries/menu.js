const db = require('../connection');

// GET /menu
const getFullMenu = () => {
  return db.query('SELECT * FROM menu_items;')
    .then(data => data.rows);
};
// GET /menu/:id
const getMenu = (id) => {
  const queryString = `SELECT * FROM menu_items WHERE name = $1;`;
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


module.exports = { getFullMenu, getMenu, createMenu };
