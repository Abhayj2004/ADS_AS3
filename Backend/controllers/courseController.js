const db = require('../db');

// Get all courses
exports.getCourses = (req, res) => {
    db.query('SELECT * FROM Course', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// CREATE TABLE Course (
//     course_id VARCHAR(10) PRIMARY KEY,
//     title VARCHAR(100),
//     dept_name VARCHAR(50),
//     credits INT CHECK (credits > 0),
//     FOREIGN KEY (dept_name) REFERENCES Department(dept_name) ON DELETE CASCADE
// );

// Create a new course
exports.createCourse = (req, res) => {
    const { course_id, title, dept_name, credits } = req.body;
    const query = 'INSERT INTO Course (course_id, title, dept_name, credits) VALUES (?, ?, ?, ?)';
    db.query(query, [course_id, title, dept_name, credits], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Course created successfully', course_id });
    });
};

// Update an existing course
exports.updateCourse = (req, res) => {
    const { course_id } = req.params;
    const { title, dept_name, credits } = req.body;
    const query = 'UPDATE course SET title = ?, dept_name = ?, credits = ? WHERE course_id = ?';
    db.query(query, [title, dept_name, credits, course_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Course not found' });
        res.json({ message: 'Course updated successfully' });
    });
};

// Delete a course
exports.deleteCourse = (req, res) => {
    const { course_id } = req.params;
    const query = 'DELETE FROM Course WHERE course_id = ?';
    db.query(query, [course_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Course not found' });
        res.json({ message: 'Course deleted successfully' });
    });
};
