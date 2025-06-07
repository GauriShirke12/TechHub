const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String }, // optional for social logins
  googleId: { type: String },
  githubId: { type: String },
   refreshToken: { type: String },
emailToken: { type: String },
isVerified: { type: Boolean, default: false },

  interests: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
