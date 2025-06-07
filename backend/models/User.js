const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String }, // optional for social logins
  googleId: { type: String },
  githubId: { type: String },
  interests: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
