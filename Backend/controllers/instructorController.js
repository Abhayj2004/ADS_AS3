const db = require('../db');

// Get all instructors
exports.getInstructors = (req, res) => {
    db.query('SELECT * FROM Instructor', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Create a new instructor
exports.createInstructor = (req, res) => {
    const { ID ,name, dept_name, salary } = req.body;
    const query = 'INSERT INTO Instructor (ID,name, dept_name, salary) VALUES (?, ?, ?, ?)';
    db.query(query, [ID, name, dept_name, salary], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Instructor added successfully'});
    });
};

// Update an existing instructor
exports.updateInstructor = (req, res) => {
    const { ID } = req.params;
    const { name, dept_name, salary } = req.body;
    const query = 'UPDATE Instructor SET name = ?, dept_name = ?, salary = ? WHERE ID = ?';
    db.query(query, [name, dept_name, salary, ID], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Instructor not found' });
        res.json({ message: 'Instructor updated successfully' });
    });
};

// Delete an instructor
exports.deleteInstructor = (req, res) => {
    const { ID } = req.params;
    const query = 'DELETE FROM Instructor WHERE ID = ?';
    db.query(query, [ID], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Instructor not found' });
        res.json({ message: 'Instructor deleted successfully' });
    });
};
