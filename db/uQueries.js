const pool = require('../lib/db');

const getUsersProducts = (users_id) => {
  return pool.query(
  'SELECT id, title, price, description, image, date_created, is_sold FROM products WHERE owner_id = $1  AND is_active = true ;', [users_id])
  .then((result) => result.rows)
    .catch(err => {
      console.log(err.message)
    })
};

const getUsersFavourites = (user_id) => {
  return pool.query('SELECT title, price, description, image, date_created, users.name AS name FROM products JOIN favourites ON product_id = products.id JOIN users ON user_id = users.id WHERE favourites.user_id = $1 GROUP BY favourites.user_id, products.id, users.name;', [user_id])
  .then((result) => result.rows)
    .catch(err => {
        console.log(err.message)
    })
};


const  deleteUsersProduct = (owner_id, id) => {
  return pool.query('UPDATE products SET is_active = false WHERE owner_id = $1 AND id= $2;', [owner_id, id])
    .then((response) => {
      return
    })
    .catch(err => {
      console.log(err.message)
    })
};

const markAsSold = (owner_id, id) => {
  return pool.query('UPDATE products SET is_sold = true WHERE owner_id = $1 AND id= $2;', [owner_id, id])
    .then((response) => {
      return;
    })
    .catch(err => {
      console.log(err.message)
    })
  };

  const addFavourite = (user_id, product_id) => {
    console.log(user_id , product_id);
    return pool.query('INSERT INTO favourites (user_id, product_id) VALUES ($1,$2);', [user_id, product_id])
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
  markAsSold,
  addFavourite
}
