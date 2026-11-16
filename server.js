
const express = require('express');
const app = express();

const PORT = 3007;

// Middleware to receive JSON data
app.use(express.json());

// Hardcoded student data
let students = [
    {
        id: 1,
        name: "john",
        email: "john@gmail.com",
        course: "Backend Development"
    },

    {
        id: 2,
        name: "Fave",
        email: "fave@gmail.com",
        course: "Frontend Development"
    },

    {
        id: 3,
        name: "bliss",
        email: "bliss@gmail.com",
        course: "Mobile Development"
    }
];

// GET all students (READ)
app.get("/api/students", (req, res) => {

    res.status(200).json({
        success: true,
        message: "All the students",
        data: students
    });

});

// GET a single student using ID (READ)
app.get("/api/students/:id", (req, res) => {

    const id = Number(req.params.id);

    const student = students.find((student) => student.id === id);
  console.log("Requested ID:", id);
  console.log("Students:", students);
    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    res.status(200).json({
        success: true,
        message: "Single student found",
        data: student
    });

});

// POST - Create a new student (CREATE)
app.post("/api/students", (req, res) => {

    const { name, email, course } = req.body;

    if (!name || !email || !course) {
        return res.status(400).json({
            success: false,
            message: "Please provide name, email and course"
        });
    }

    const newStudent = {
        id: students.length > 0
            ? Math.max(...students.map(student => student.id)) + 1
            : 1,
        name: name,
        email: email,
        course: course
    };

students.push(newStudent);

res.status(201).json({
    success: true,
    message: "New student created successfully",
    data: newStudent
});

});

// PUT - Update an existing student's course (UPDATE)

app.put("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find((student) => student.id === id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    const { course } = req.body;

    if (!course) {
        return res.status(400).json({
            success: false,
            message: "Please provide a new course"
        });
    }

    student.course = course;

    res.status(200).json({
        success: true,
        message: "Student course updated successfully",
        data: students
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});
