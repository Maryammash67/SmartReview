// const addProduct = `
//         INSERT INTO products
//         (sku, name, price, discount, new, rating, sale_count, category, tag, stock, image, short_description, full_description)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

const addProduct =
  "INSERT INTO products (sku, name, price, discount, new, rating, sale_count, category, tag, stock, image, short_description, full_description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

const checkProductNameExists = "SELECT * FROM products WHERE name = ?";

const getAllProducts =
  "SELECT id, sku, name, price, discount, new, rating, sale_count AS saleCount, category, tag, stock, image, short_description, full_description FROM products";

  const getProductById = `
  SELECT
    *
  FROM
    products
  WHERE
    id = ?
`;

module.exports = {
  addProduct,
  checkProductNameExists,
  getAllProducts,
  getProductById,
};
