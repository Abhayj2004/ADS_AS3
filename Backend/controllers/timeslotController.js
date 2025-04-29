const db = require('../db');

exports.getTimeslot = (req, res) => {
    db.query('SELECT * FROM Time_Slot', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.addTimeslot = (req, res) => {
    const { time_slot_id, day, start_time,end_time } = req.body;
    db.query('INSERT INTO Time_Slot (time_slot_id, day, start_time,end_time) VALUES (?, ?, ?, ?)', [time_slot_id, day, start_time,end_time], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Time_Slot added successfully', id: result.insertId });
    });
};

exports.deleteTimeslot = (req, res) => {
    const { time_slot_id } = req.params;
    db.query('DELETE FROM Time_Slot WHERE time_slot_id = ?', [time_slot_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Time_Slot deleted successfully' });
    });
};
