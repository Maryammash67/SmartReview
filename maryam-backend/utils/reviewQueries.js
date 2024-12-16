const addReview =
  "INSERT INTO reviews (user_id, product_id, rating,comment) VALUES (?, ?, ?, ?)";

const getAllReview = "SELECT * FROM reviews";

const getProductReviews = `
  SELECT 
    COUNT(*) AS review_count, 
    AVG(rating) AS average_rating,
    GROUP_CONCAT(CONCAT(users.full_name, ':', reviews.comment) SEPARATOR ';') AS reviews
  FROM 
    reviews 
  JOIN 
    users 
  ON 
    reviews.user_id = users.user_id
  WHERE 
    product_id = ?;
`;




module.exports = {
  addReview,
  getAllReview,
  getProductReviews
};