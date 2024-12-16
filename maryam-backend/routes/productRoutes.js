const { Router } = require("express");

const productController = require("../controllers/productController");
const router = Router();

router.post("/addproduct", productController.addProduct);

router.get("/getallproducts", productController.getAllProducts);

router.get('/getproduct/:id', productController.getProductById);

module.exports = router;
