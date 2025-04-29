const express = require('express');
const { getSections ,createSection,deletSection } = require('../controllers/sectionController');
const router = express.Router();

// Get all sections
router.get('/', getSections);
router.post('/', createSection);
router.delete('/:course_id', deletSection);

module.exports = router;
