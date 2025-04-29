const db = require('../db');

// Get all sections
exports.getSections = (req, res) => {
    db.query('SELECT * FROM Section', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};


exports.createSection = (req, res) => {
    const { course_id, sec_id, semester, year, building, room_number, time_slot_id } = req.body;
    const query = 'INSERT INTO Section (course_id, sec_id, semester, year, building, room_number,time_slot_id ) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [course_id, sec_id, semester, year, building, room_number, time_slot_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'section created successfully', course_id });
    });
};

exports.deletSection = (req, res) => {
    const { course_id } = req.params;
    const query = 'DELETE FROM Section WHERE course_id = ?';
    db.query(query, [course_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'section not found' });
        res.json({ message: 'section deleted successfully' });
    });
};
// exports.deletSection = (req, res) => {
//     console.log("After")
//     const { course_id } = req.params;
//     const query = 'DELETE FROM Section WHERE course_id = ?';
//     db.query(query, [course_id], (err, results) => {
//         if (err) return res.status(500).json({ error: err.message });
//         if (results.affectedRows === 0) return res.status(404).json({ message: 'section not found' });
//         res.json({ message: 'section deleted successfully' });
//     });
// };

// exports.deleteDepartment = (req, res) => {
//     const { dept_name } = req.params;
//     db.query('DELETE FROM Department WHERE dept_name = ?', [dept_name], (err, result) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.json({ message: 'Department deleted successfully' });
//     });
// };