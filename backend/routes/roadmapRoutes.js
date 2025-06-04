const express = require('express');
const { getRoadmapByDomain, addOrUpdateRoadmap } = require('../controllers/roadmapController');
const { protect } = require('../middleware/authMiddleware');  // Protect add/update route if needed

const router = express.Router();

router.get('/:domain', getRoadmapByDomain);
router.post('/', protect, addOrUpdateRoadmap);

module.exports = router;
