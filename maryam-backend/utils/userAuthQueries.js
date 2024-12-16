const addUser = 
  "INSERT INTO users (full_name, username, email, hashed_password, disabled, user_type) VALUES (?, ?, ?, ?, ?, ?)";

const checkUserEmailExists = 
  "SELECT * FROM users WHERE email = ?";

const getUserByEmail = 
  "SELECT * FROM users WHERE email = ?";

const getUserById = 
  "SELECT full_name, username, email, user_type FROM users WHERE user_id = ?";

module.exports = {
  addUser,
  checkUserEmailExists,
  getUserByEmail,
  getUserById,
};
