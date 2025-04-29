const db = require('../db');

exports.getClassroom = (req, res) => {
    db.query('SELECT * FROM Classroom', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};
// CREATE TABLE Classroom (
//     building VARCHAR(50),
//     room_number VARCHAR(10),
//     capacity INT,
//     PRIMARY KEY (building, room_number)
// );

exports.addClassroom = (req, res) => {
    const { building, room_number, capacity } = req.body;
    db.query('INSERT INTO Classroom (building, room_number, capacity) VALUES (?, ?, ?)', [ building, room_number, capacity], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Classroom added successfully', id: result.insertId });
    })  ;
};

exports.deleteClassroom = (req, res) => {
    const { building } = req.params;
    db.query('DELETE FROM Classroom WHERE building = ?', [building], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Classroom deleted successfully' });
    });
};
    