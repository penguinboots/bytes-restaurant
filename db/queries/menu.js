const db = require('../connection');

const getFullMenu = () => {
  return db.query('SELECT * FROM menu_items;')
    .then(data => data.rows);
};

module.exports = { getFullMenu };