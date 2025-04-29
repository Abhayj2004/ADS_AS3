const db = require('../db');

// Get all students
exports.getStudents = (req, res) => {
    db.query('SELECT * FROM Students', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};


// CREATE TABLE Student (
//     ID VARCHAR(10) PRIMARY KEY,
//     name VARCHAR(100),
//     dept_name VARCHAR(50),
//     tot_cred INT,
//     FOREIGN KEY (dept_name) REFERENCES Department(dept_name) ON DELETE SET NULL
// );


// Create a new student
exports.createStudent = (req, res) => {
    const {name, dept_name, tot_cred } = req.body;
    const query ='INSERT INTO Students (name, dept_name, tot_cred) VALUES (?, ?, ?)'; 
   db.query(query , [name, dept_name, tot_cred],(err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Student Added'});
    });
};

// exports.createCourse = (req, res) => {
//     const { course_id, title, dept_name, credits } = req.body;
//     const query = 'INSERT INTO Course (course_id, title, dept_name, credits) VALUES (?, ?, ?, ?)';
//     db.query(query, [course_id, title, dept_name, credits], (err, results) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.status(201).json({ message: 'Course created successfully', course_id });
//     });
// };


// Delete a student
exports.deleteStudent = (req, res) => {
    const ID=req.params.ID;
    
    db.query('DELETE FROM Students WHERE ID = ?', [ID], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Student Deleted' });
    });


};

// app.put('/mobile/:id', (req, res) => {
//     const { id } = req.params;
//     const { name, sim_port, company, price } = req.body;
//     const query = 'UPDATE mobile SET name = ?, Sim_port = ?, Company = ?, Price = ? WHERE id = ?';
//     db.query(query, [name, sim_port, company, price, id], (err, results) => {
//       if (err) {
//         console.error('Error updating company:', err);
//         return res.status(500).json({ error: 'Failed to update company' });
//       }
//       res.json({ id, name, sim_port, company, price });
//     });
//   });

exports.updateStudent = (req, res) => {
    
       const { ID } = req.params;
    const {name, dept_name, tot_cred} = req.body;
    const query = 'UPDATE Students SET name = ?, dept_name = ?, tot_cred = ? WHERE id = ?';
    db.query(query, [name, dept_name, tot_cred, ID], (err, results) => {
      if (err) {
        console.error('Error updating company:', err);
        return res.status(500).json({ error: 'Failed to update company' });
      }
      res.json({ ID, name, dept_name, tot_cred});
    });
};
