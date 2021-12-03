const pool = require('../lib/db');

const getUsersProducts = (users_id) => {
  return pool.query(
  'SELECT id, title, price, description, image, date_created, is_sold FROM products WHERE owner_id = $1  AND is_active = true ;', [users_id])
  .then((result) => result.rows)
    .catch(err => {
      console.log(err.message)
    })
};

const getProductById = (product_id) => {
  return pool
  .query(`SELECT * FROM PRODUCTS WHERE id = $1`,[product_id])
  .then(result => {
    return result.rows[0];
  })
}

const getUsersFavourites = (user_id) => {
  return pool.query(`SELECT products.id, title, price, description, image, TO_CHAR(date_created :: DATE, 'Mon dd, yyyy') AS date_created, users.name AS name FROM products JOIN favourites ON product_id = products.id JOIN users ON user_id = users.id WHERE favourites.user_id = $1 GROUP BY favourites.user_id, products.id, users.name;`, [user_id])
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

const newProduct = function(title, price, description, image) {
  return pool.query( `INSERT INTO products (title, owner_id, price, description, image, is_active, is_sold)
  VALUES ($1, 1,  $2, $3, $4, TRUE, FALSE) RETURNING id;`, [title, price, description, image]
  )
}

const addFavourite = (user_id, product_id) => {
  return pool.query('INSERT INTO favourites (user_id, product_id) VALUES ($1,$2);', [user_id, product_id])
    .then((response) => {
      return;
    })
    .catch(err => {
      console.log(err.message)
    })
  };
  const addMessage = (conversation_id, sender_id, sender_name, message) => {
    return pool.query('INSERT INTO messages (conversation_id, sender_id, sender_name, message) VALUES ($1,$2,$3,$4);', [conversation_id, sender_id, sender_name, message])
      .then((response) => {
        return;
      })
      .catch(err => {
        console.log(err.message)
      })
    };

    const newConversation = (buyer_id, product_id) => {
      return pool.query('INSERT INTO conversations (buyer_id, product_id) VALUES ($1,$2) RETURNING *;', [buyer_id, product_id])
        .then((response) => {
          return response.rows
        })
        .catch(err => {
          console.log(err.message)
        })
      };


    const getAllConversations = (user_id) => {
      return pool.query(
        'SELECT conversations.* , products.title as product, conversations.buyer_id as buyer, products.owner_id as seller, users.name as buyer_name  FROM conversations JOIN products ON conversations.product_id = products.id JOIN users on conversations.buyer_id= users.id WHERE conversations.buyer_id = $1 OR products.owner_id = $1;', [user_id])
        .then((response) => {
          return response.rows;
        })
        .catch(err => {
          console.log(err.message)
        })
      };

  const getUserMessages = (chat_id) => {
    return pool.query(
      'SELECT * from messages WHERE conversation_id = $1', [chat_id])
      .then((response) => {
        return response.rows;
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
  addFavourite,
  newProduct,
  getAllConversations,
  getUserMessages,
  getProductById,
  addMessage,
  newConversation
}
