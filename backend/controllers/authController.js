const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
  const { name, email, password, interests } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    interests,
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    interests: user.interests,
    token: generateToken(user._id),
  });
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !user.password) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    interests: user.interests,
    token: generateToken(user._id),
  });
};

// @desc    Social login
// @route   POST /api/auth/social-login
// @access  Public
exports.socialLogin = async (req, res) => {
  const { provider, socialId, name, email } = req.body;

  if (!provider || !socialId || !email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    let user;

    const socialKey = provider === 'google' ? 'googleId' : provider === 'github' ? 'githubId' : null;
    if (!socialKey) return res.status(400).json({ message: 'Unsupported provider' });

    user = await User.findOne({ [socialKey]: socialId }) || await User.findOne({ email });

    if (user) {
      if (!user[socialKey]) {
        user[socialKey] = socialId;
        await user.save();
      }
    } else {
      user = await User.create({ name, email, [socialKey]: socialId });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      interests: user.interests,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
