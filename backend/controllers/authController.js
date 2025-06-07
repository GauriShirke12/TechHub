const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Generate tokens
const generateAccessToken = (user) =>
  jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '15m' });

const generateRefreshToken = (user) =>
  jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

// Register user
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
  const emailToken = crypto.randomBytes(32).toString('hex');

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    interests: interests || [],
    emailToken,
    isVerified: false,
  });

  const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${emailToken}`;
  await sendEmail(email, 'Verify your email', `
    <p>Hello ${name},</p>
    <p>Click the link below to verify your email:</p>
    <a href="${verificationUrl}">${verificationUrl}</a>
  `);

  res.status(201).json({ message: 'Verification email sent. Please check your inbox.' });
};

// Verify email
exports.verifyEmail = async (req, res) => {
  const { token } = req.body;
  const user = await User.findOne({ emailToken: token });

  if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

  user.emailToken = null;
  user.isVerified = true;
  await user.save();

  res.status(200).json({ message: 'Email verified successfully' });
};

// Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !user.password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  if (!user.isVerified) {
    return res.status(403).json({ message: 'Please verify your email before logging in' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  user.refreshToken = refreshToken;
  await user.save();

  res.json({
    token: accessToken,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      interests: user.interests,
    },
  });
};

// Social login
exports.socialLogin = async (req, res) => {
  const { provider, socialId, name, email } = req.body;

  if (!provider || !socialId || !email) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    let user;
    if (provider === 'google') {
      user = await User.findOne({ googleId: socialId }) || await User.findOne({ email });
      user ? user.googleId = socialId : user = await User.create({ name, email, googleId: socialId, isVerified: true });
    } else if (provider === 'github') {
      user = await User.findOne({ githubId: socialId }) || await User.findOne({ email });
      user ? user.githubId = socialId : user = await User.create({ name, email, githubId: socialId, isVerified: true });
    } else {
      return res.status(400).json({ message: 'Unsupported provider' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      token: accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        interests: user.interests,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get profile
exports.getUserProfile = async (req, res) => {
  const user = req.user;
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    interests: user.interests,
  });
};

// Refresh token
exports.refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided' });
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    user.refreshToken = newRefreshToken;
    await user.save();

    res.json({
      token: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired refresh token' });
  }
};

// Logout
exports.logoutUser = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(204);

  try {
    const user = await User.findOne({ refreshToken });
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Logout failed' });
  }
};
