const express = require('express');
const router = express.Router();

// Middleware
const { protect } = require('../middleware/authMiddleware');

// Controller functions
const {
  registerUser,
  loginUser,
  socialLogin,
  getUserProfile,
} = require('../controllers/authController');

// Validator
const { validateEmail } = require('../utils/validators');

// @route   POST /api/auth/register
// @desc    Register new user with email validation
router.post('/register', (req, res, next) => {
  const { email } = req.body;
  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  return registerUser(req, res, next);
});

// @route   POST /api/auth/login
// @desc    Login user
router.post('/login', loginUser);

// @route   POST /api/auth/social-login
// @desc    Social login with Google/GitHub
router.post('/social-login', socialLogin);

// @route   GET /api/auth/profile
// @desc    Get logged-in user's profile (Protected)
router.get('/profile', protect, getUserProfile);

module.exports = router;
