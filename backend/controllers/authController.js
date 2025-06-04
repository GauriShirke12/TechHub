const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

exports.register = async (req, res) => {
  const { name, email, password, interests } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Email already registered' });

    const user = await User.create({ name, email, password, interests });
    const token = generateToken(user);

    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email, interests: user.interests },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = generateToken(user);

    res.json({
      user: { id: user._id, name: user.name, email: user.email, interests: user.interests },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
