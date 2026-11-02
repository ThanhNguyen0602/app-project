const db = require('../config/db');

const getAll = async () => {
  const [rows] = await db.query(
    `SELECT p.*, c.name AS category_name
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.id
     ORDER BY p.id ASC`
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await db.query(
    `SELECT p.*, c.name AS category_name
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.id
     WHERE p.id = ?`,
    [id]
  );
  const product = rows[0];
  if (!product) return undefined;

  const [images] = await db.query(
    'SELECT id, image_url FROM product_images WHERE product_id = ? ORDER BY id ASC',
    [id]
  );
  const [variants] = await db.query(
    'SELECT id, color, size, stock, price_adjustment FROM product_variants WHERE product_id = ? ORDER BY id ASC',
    [id]
  );

  return { ...product, images, variants };
};

module.exports = {
  getAll,
  getById,
};
