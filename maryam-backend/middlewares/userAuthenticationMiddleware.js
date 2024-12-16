const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  // Check for the token in the Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("User is not authenticated");
    return res.status(401).json({ error: "You are not authenticated" });
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Invalid token - ", err);
      return res.status(403).json({ error: "Invalid token" });
    }
    console.log("Decoded from admin auth middleware - ", decoded);
    req.user = decoded;
    next();
  });
};

module.exports = {
  verifyUser,
};
