const { Router } = require("express");

const reviewController = require("../controllers/reviewController");
const userAthenticator = require("../middlewares/userAuthenticationMiddleware");
const router = Router();


router.post("/addreview", userAthenticator.verifyUser, reviewController.addReview);

router.get("/getallreview", reviewController.getAllReview);

// Add this line
router.get("/product/:product_id/reviews", reviewController.getProductReviews);

module.exports = router;