const Roadmap = require('../models/Roadmap');

// Utility: Convert domain to slug (e.g., "MERN Stack" → "mern-stack")
const slugify = (text) => {
  return text.toString().toLowerCase().trim().replace(/\s+/g, '-');
};

// Get roadmap by domain (using slug)
exports.getRoadmapByDomain = async (req, res) => {
  try {
    const { domain } = req.params;
    const domainSlug = slugify(domain);

    const roadmap = await Roadmap.findOne({ slug: domainSlug });

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

    const domainSlug = slugify(domain);

    let roadmap = await Roadmap.findOne({ slug: domainSlug });

    if (roadmap) {
      roadmap.domain = domain; // Keep the readable domain
      roadmap.milestones = milestones;
      await roadmap.save();
      return res.json({ message: 'Roadmap updated successfully', roadmap });
    }

    roadmap = new Roadmap({ domain, slug: domainSlug, milestones });
    await roadmap.save();
    res.status(201).json({ message: 'Roadmap created successfully', roadmap });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
