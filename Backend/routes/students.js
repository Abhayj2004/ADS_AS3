const express = require('express');
const { getStudents, createStudent, deleteStudent ,updateStudent} = require('../controllers/studentController');

const router = express.Router();

// Get all students
router.get('/', getStudents);

// Add a new student
router.post('/', createStudent);

// Delete a student
router.delete('/:ID', deleteStudent);

router.put('/:ID',updateStudent)

module.exports = router;
