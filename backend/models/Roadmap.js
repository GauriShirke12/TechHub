const mongoose = require('mongoose');

// Milestone sub-schema
const milestoneSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, required: true },
  quizzes: { type: [String], default: [] },
  projects: { type: [String], default: [] }
});

// Roadmap main schema
const roadmapSchema = new mongoose.Schema({
  domain: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  milestones: { type: [milestoneSchema], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Roadmap', roadmapSchema);
