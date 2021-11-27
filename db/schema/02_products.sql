-- Drop and recreate products table

DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  price VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(255) NOT NULL,
  date_created DATE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_sold BOOLEAN NOT NULL DEFAULT TRUE
);
