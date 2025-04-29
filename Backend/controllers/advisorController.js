const db = require('../db');

// Get all takes (student-course relationships)
exports.getAdvisor = (req, res) => {
    db.query('SELECT * FROM Advisor', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};
