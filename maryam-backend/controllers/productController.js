const pool = require("../config/db.js");
require("dotenv").config();

const productQueries = require("../utils/productQueries.js");

const addProduct = async (req, res) => {
  const {
    sku,
    name,
    price,
    discount,
    new: isNew,
    rating,
    saleCount,
    category,
    tag,
    stock,
    image,
    shortDescription,
    fullDescription,
  } = req.body;

  const params = [
    sku,
    name,
    price,
    discount,
    isNew,
    rating,
    saleCount,
    JSON.stringify(category),
    JSON.stringify(tag),
    stock,
    JSON.stringify(image),
    shortDescription,
    fullDescription,
  ];

  try {
    // Check if product name already exists
    const [checkResults] = await pool.query(productQueries.checkProductNameExists, [name]);

    if (checkResults.length) {
      console.log("Product already exists");
      return res.status(400).json({ error: "Product already exists" });
    }

    // Add new product
    await pool.query(productQueries.addProduct, params);
    console.log("Product added successfully");
    return res.status(201).json({ status: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({ error: "Database error" });
  }
};




const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const [results] = await pool.query(productQueries.getAllProducts);

    // Map the results to the desired format
    const products = results.map((product) => ({
      id: product.id,
      sku: product.sku,
      name: product.name,
      price: parseFloat(product.price), // Ensure price is a float
      discount: parseFloat(product.discount), // Ensure discount is a float
      new: product.new,
      rating: parseInt(product.rating, 10), // Ensure rating is an integer
      saleCount: parseInt(product.sale_count, 10), // Ensure saleCount is an integer
      category: JSON.parse(product.category), // Parse JSON string to array
      tag: JSON.parse(product.tag), // Parse JSON string to array
      stock: parseInt(product.stock, 10), // Ensure stock is an integer
      image: JSON.parse(product.image), // Parse JSON string to array
      short_description: product.short_description,
      full_description: product.full_description,
    }));

    console.log("Products to be sent to frontend:", products);

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Function to fetch a single product by its ID
const getProductById = async (req, res) => {
  const { id } = req.params; // Get the product ID from the request parameters

  try {
    // Fetch the product from the database
    const [results] = await pool.query(productQueries.getProductById, [id]);

    if (results.length === 0) {
      // If no product is found with the given ID, return a 404 response
      return res.status(404).json({ error: 'Product not found' });
    }

    // Map the result to the desired format
    const product = {
      id: results[0].id,
      sku: results[0].sku,
      name: results[0].name,
      price: parseFloat(results[0].price), // Ensure price is a float
      discount: parseFloat(results[0].discount), // Ensure discount is a float
      new: results[0].new,
      rating: parseInt(results[0].rating, 10), // Ensure rating is an integer
      saleCount: parseInt(results[0].sale_count, 10), // Ensure saleCount is an integer
      category: JSON.parse(results[0].category), // Parse JSON string to array
      tag: JSON.parse(results[0].tag), // Parse JSON string to array
      stock: parseInt(results[0].stock, 10), // Ensure stock is an integer
      image: JSON.parse(results[0].image), // Parse JSON string to array
      short_description: results[0].short_description,
      full_description: results[0].full_description,
    };

    // Send the product data to the frontend
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};


module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
};
