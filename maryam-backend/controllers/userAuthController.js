//Authentication logic (register, login)
const pool = require("../config/db.js");
require("dotenv").config();
// import bcrypt from "bcrypt";
const bcrypt = require("bcrypt");
// import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken");

const userAuthQueries = require("../utils/userAuthQueries.js");

const saltRounds = 10;

//addadmin
const addUser = (req, res) => {
  console.log("Processing add user request");

  const { full_name, username, email, password, disabled, user_type } = req.body;

  // Hashing password
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      console.log("Error hashing password");
      return res.status(500).json({ error: "Error hashing password" });
    }

    console.log("Hashed password:", hash);

    try {
      // Check if email exists
      const [emailCheckResults] = await pool.query(userAuthQueries.checkUserEmailExists, [email]);
      if (emailCheckResults.length > 0) {
        console.log("Email already exists");
        return res.status(400).json({ error: "Email already exists" });
      }

      // Add user
      const [insertResult] = await pool.query(
        userAuthQueries.addUser,
        [full_name, username, email, hash, disabled, user_type]
      );
      console.log("User added successfully:", insertResult);
      return res.status(201).json({ status: "User added successfully" });
    } catch (error) {
      console.log("Database error while adding user:", error);
      return res.status(500).json({ error: "Database error" });
    }
  });
};




const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch user by email
    const [results] = await pool.query(userAuthQueries.getUserByEmail, [email]);

    // Check if user exists
    if (results.length === 0) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    const user = results[0];
    console.log("User found:", user);

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.hashed_password);

    if (!isMatch) {
      console.log("Password not matched");
      return res.status(400).json({ error: "Password not matched" });
    }

    // Generate a JWT token if the password matches
    const token = jwt.sign(
      { id: user.user_id, name: user.full_name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION || '1d' } // Default to 1 day if not set
    );

    // Set the token as a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    console.log("Authentication successful, token generated", token);
    return res.status(200).json({ status: "Success", token });
  } catch (err) {
    console.log("Database error:", err);
    return res.status(500).json({ error: "Database error" });
  }
};


const userLogout = (req, res) => {
  console.log("request received");
  res.clearCookie("token");
  return res.json({ status: "Success" });
};

const getProfile = async (req, res) => {
  console.log("came to get profile", req.user.id);

  try {
    // Query the database to get user profile by id
    const [rows] = await pool.query(userAuthQueries.getUserById, [req.user.id]);

    // Check if the user exists
    if (rows.length > 0) {
      const userProfile = rows[0];

      // Send the user profile as a JSON response
      res.json({
        status: "success",
        data: userProfile,
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch user profile",
    });
  }
};


module.exports = {
  addUser,
  userLogin,
  userLogout,
  getProfile,
};
