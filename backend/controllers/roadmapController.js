const Roadmap = require('../models/Roadmap');

// Utility: Convert domain to slug (e.g., "AI/ML" → "ai-ml")
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')  // Replace non-alphanumeric chars with dashes
    .replace(/^-+|-+$/g, '');     // Trim starting and trailing dashes
};

// GET /api/roadmaps/:domain
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
    console.error('Error fetching roadmap:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/roadmaps (Create or Update)
exports.addOrUpdateRoadmap = async (req, res) => {
  try {
    const { domain, milestones } = req.body;

    if (!domain || !Array.isArray(milestones)) {
      return res.status(400).json({ message: 'Please provide domain and milestones (as array)' });
    }

    const slug = slugify(domain);
    let roadmap = await Roadmap.findOne({ slug });

    if (roadmap) {
      roadmap.domain = domain; // maintain updated domain name
      roadmap.milestones = milestones;
      await roadmap.save();
      return res.json({ message: 'Roadmap updated successfully', roadmap });
    }

    roadmap = new Roadmap({ domain, slug, milestones });
    await roadmap.save();

    res.status(201).json({ message: 'Roadmap created successfully', roadmap });
  } catch (error) {
    console.error('Error creating/updating roadmap:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
