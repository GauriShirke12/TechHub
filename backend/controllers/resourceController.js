const Resource = require('../models/Resource');

// Add a new resource
exports.addResource = async (req, res) => {
  try {
    const { title, description, url, domain, type, difficulty } = req.body;

    if (!title || !url || !domain || !type) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newResource = new Resource({
      title,
      description,
      url,
      domain,
      type,
      difficulty,
      uploadedBy: req.user.id  // assuming user is authenticated and user id is in req.user
    });

    const savedResource = await newResource.save();
    res.status(201).json(savedResource);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get resources with optional filters: domain, type, difficulty
exports.getResources = async (req, res) => {
  try {
    const { domain, type, difficulty } = req.query;

    let filter = {};
    if (domain) filter.domain = domain;
    if (type) filter.type = type;
    if (difficulty) filter.difficulty = difficulty;

    const resources = await Resource.find(filter).populate('uploadedBy', 'name email');
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
