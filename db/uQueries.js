const pool = require('../lib/db');

const getUsersProducts = (users_id) => {
  return pool.query(
  'SELECT title, price, description, image, date_created FROM products WHERE owner_id = $1;', [users_id])
  .then((result) => result.rows)
    .catch(err => {
      console.log(err.message)
    })
};

const getUsersFavourites = (id) => {
  return pool.query('SELECT title, price, description, image, date_created FROM products JOIN favourites ON owner_id = products.id JOIN users ON user_id = users.id WHERE favourites.user_id = $1 GROUP BY favourites.user_id, products.id;', [id])
  .then((result) => result.rows)
    .catch(err => {
        console.log(err.message)
    })
};

const getUsersSold = (owner_id) => {
  return pool.query('SELECT title, price, description, image, date_created FROM products WHERE owner_id = $1 AND is_sold = true;, [owner_id])')
    .then((response) => {
      return response.rows;
    })
    .catch(err => {
      console.log(err.message)
    })
};

const   deleteUsersProduct = (owner_id, id) => {
  return pool.query('UPDATE products SET is_active = false WHERE owner_id = $1 AND id= $2;, [owner_id, products.id];, [owner_id, id]')
    .then((response) => {
      return
    })
    .catch(err => {
      console.log(err.message)
    })
};

const markAsSold = (owner_id, id) => {
  return pool.query('UPDATE products SET is_sold = true WHERE owner_id = $1 AND id= $2;, [owner_id, id]')
    .then((response) => {
      return;
    })
    .catch(err => {
      console.log(err.message)
    })
  };

module.exports = {
  getUsersProducts,
  getUsersFavourites,
  deleteUsersProduct,
  markAsSold
}
