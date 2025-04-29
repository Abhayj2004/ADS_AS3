const express = require('express');
const { getAdvisor } = require('../controllers/advisorController');

const router = express.Router();

// Get all takes (student-course relationships)
router.get('/', getAdvisor);

module.exports = router;
