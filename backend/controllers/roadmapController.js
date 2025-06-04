const Roadmap = require('../models/Roadmap');

// Get roadmap by domain
exports.getRoadmapByDomain = async (req, res) => {
  try {
    const { domain } = req.params;
    const roadmap = await Roadmap.findOne({ domain });

    if (!roadmap) {
      return res.status(404).json({ message: 'Roadmap not found for this domain' });
    }

    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add or update roadmap (admin or protected route)
exports.addOrUpdateRoadmap = async (req, res) => {
  try {
    const { domain, milestones } = req.body;

    if (!domain || !milestones) {
      return res.status(400).json({ message: 'Please provide domain and milestones' });
    }

    let roadmap = await Roadmap.findOne({ domain });

    if (roadmap) {
      roadmap.milestones = milestones;
      await roadmap.save();
      return res.json({ message: 'Roadmap updated successfully', roadmap });
    }

    roadmap = new Roadmap({ domain, milestones });
    await roadmap.save();
    res.status(201).json({ message: 'Roadmap created successfully', roadmap });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
