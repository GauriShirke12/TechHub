const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
};

// @desc    Register a new user
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
    interests: interests || [],
  });

  if (user) {
    res.status(201).json({
      token: generateToken(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        interests: user.interests,
      },
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({
    token: generateToken(user),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      interests: user.interests,
    },
  });
};

// @desc    Social login (Google, GitHub)
// @route   POST /api/auth/social-login
// @access  Public
exports.socialLogin = async (req, res) => {
  const { provider, socialId, name, email } = req.body;

  if (!provider || !socialId || !email) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    let user;

    if (provider === 'google') {
      user = await User.findOne({ googleId: socialId }) || await User.findOne({ email });
      if (user) {
        user.googleId = socialId;
        await user.save();
      } else {
        user = await User.create({ name, email, googleId: socialId });
      }
    } else if (provider === 'github') {
      user = await User.findOne({ githubId: socialId }) || await User.findOne({ email });
      if (user) {
        user.githubId = socialId;
        await user.save();
      } else {
        user = await User.create({ name, email, githubId: socialId });
      }
    } else {
      return res.status(400).json({ message: 'Unsupported provider' });
    }

    res.json({
      token: generateToken(user),
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
