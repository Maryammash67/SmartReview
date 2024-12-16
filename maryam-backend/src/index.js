const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const userAuthRoutes = require("../routes/userAuthRoutes");
const productRoutes = require("../routes/productRoutes");
const reviewRoutes = require("../routes/reviewRoutes");

const app = express();

// app.use(cors());

//Modify this code according to frontend

app.use(
  cors({
    origin: "http://localhost:3000", // Adjust the origin based on your frontend's port
    credentials: true, // Allow credentials (cookies)
  })
);

app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to Ecommerc APP.");
});

// Use cookie-parser middleware
app.use(cookieParser());

app.use("/api/v1/userauth", userAuthRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/review", reviewRoutes);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
