const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  order: Number,           // order of milestone in roadmap
  quizzes: [String],       // array of quiz IDs or names
  projects: [String],      // array of project descriptions or IDs
});

const roadmapSchema = new mongoose.Schema({
  domain: { type: String, required: true, unique: true },  // e.g., MERN, AI/ML
  milestones: [milestoneSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Roadmap', roadmapSchema);
