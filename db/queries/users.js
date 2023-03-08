const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUser = (id) => {
  const queryString = `SELECT * FROM users WHERE id = $1;`;
  const values = [id];
  return db.query(queryString, values)
    .then(data => data.rows);
};


module.exports = { getUsers, getUser };
