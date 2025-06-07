const express = require('express');
const router = express.Router();

// Import controller functions
const {
  registerUser,
  loginUser,
  socialLogin,
} = require('../controllers/authController');

// Import optional validator
const { validateEmail } = require('../utils/validators');

// Register route
router.post('/register', (req, res, next) => {
  const { email } = req.body;
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  return registerUser(req, res, next);
});

// Login route
router.post('/login', loginUser);

// Social login route
router.post('/social-login', socialLogin);

module.exports = router;
