const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  socialLogin,
  getUserProfile,
  refreshAccessToken,
  logoutUser,
  verifyEmail
} = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware');
const { validateEmail } = require('../utils/validators');

// Register
router.post('/register', (req, res, next) => {
  const { email } = req.body;
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  return registerUser(req, res, next);
});

// Verify email
router.post('/verify-email', verifyEmail);

// Login
router.post('/login', loginUser);

// Social Login
router.post('/social-login', socialLogin);

// Refresh token
router.post('/refresh-token', refreshAccessToken);

// Get user profile
router.get('/profile', protect, getUserProfile);

// Logout
router.post('/logout', logoutUser);

module.exports = router;
