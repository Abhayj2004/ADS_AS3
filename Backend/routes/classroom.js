const express = require('express');
const { getClassroom, addClassroom, updateClassroom, deleteClassroom } = require("../controllers/classroomController")
const router = express.Router();

router.get('/', getClassroom);
router.post('/', addClassroom);
router.delete('/:building', deleteClassroom);

module.exports = router;
