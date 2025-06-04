const express = require('express');
const { addResource, getResources } = require('../controllers/resourceController');
const { protect } = require('../middleware/authMiddleware'); // middleware to protect routes

const router = express.Router();

router.post('/', protect, addResource);
router.get('/', getResources);

module.exports = router;
