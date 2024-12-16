const pool = require("../config/db.js");
require("dotenv").config();


const reviewQueries = require("../utils/reviewQueries.js");

const addReview = async (req,res) => {

    const {
      product_id,
      rating,
      comment,
      
      } = req.body;

      const user_id_real = req.user.id;

      const params = [
        user_id_real,
        product_id,
        rating,
        comment,
      ];

      
      try {
         // Add new product
        await pool.query(reviewQueries.addReview, params);
        console.log("Review added successfully");
        return res.status(201).json({ status: "Review added successfully" });
      }catch(error){
        console.error("Error adding product:", error);
        return res.status(500).json({ error: "Database error" });
      }
}

const getAllReview = async (req, res) =>{
  try {

    const results = await pool.query(reviewQueries.getAllReview);
    return res.status(200).json(results);
  }catch (error){
    console.error("Error fetching products:", error);
    return res.status(500).json({ error: "Failed to fetch products" });
  }
}


const getProductReviews = async (req, res) => {
  const { product_id } = req.params;

  try {
    const [results] = await pool.query(reviewQueries.getProductReviews, [product_id]);

    if (results.length === 0) {
      return res.status(404).json({ message: "No reviews found for this product" });
    }

    // Convert the concatenated reviews string into a JSON array
    const reviewsArray = results[0].reviews
      ? results[0].reviews.split(';').map(review => {
          const [user, comment] = review.split(':');
          return { user, comment };
        })
      : [];

    return res.status(200).json({
      product_id,
      review_count: results[0].review_count,
      average_rating: results[0].average_rating,
      reviews: reviewsArray,
    });
  } catch (error) {
    console.error("Error fetching product reviews:", error);
    return res.status(500).json({ error: "Failed to fetch product reviews" });
  }
};





module.exports = {
  addReview,
  getAllReview,
  getProductReviews
};