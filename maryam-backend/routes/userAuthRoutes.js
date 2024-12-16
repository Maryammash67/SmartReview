const { Router } = require("express");

const userAuthController = require("../controllers/userAuthController");
const userAuthenticationMiddleware = require("../middlewares/userAuthenticationMiddleware");
const router = Router();

router.post("/adduser", userAuthController.addUser);

//This adduser API expectations are as below. send the data in the body of the request.
// {
//     "full_name" : "Tharindu Malinga",
//     "username" : "Tmalin",
//     "email" : "demoemail@gmail.com",
//     "password" : "0771307505",
//     "disabled" : "False",
//     "user_type" : "Admin"
// }

router.post("/userlogin", userAuthController.userLogin);

//This user login API expects email and password in the request body.

router.get("/userlogout", userAuthController.userLogout);
//just send the API

router.get(
  "/userprofile",
  userAuthenticationMiddleware.verifyUser,
  userAuthController.getProfile
);

module.exports = router;
