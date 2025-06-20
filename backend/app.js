const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/users');
const resourceRoutes = require('./routes/resourceRoutes');
const roadmapRoutes = require('./routes/roadmapRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/roadmaps', roadmapRoutes);

module.exports = app;
