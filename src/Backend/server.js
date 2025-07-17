const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // default password for XAMPP MySQL
  database: 'recipe_db',
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
  } else {
    console.log('✅ Connected to MySQL database');
  }
});

// Register Route
app.post('/auth/register', (req, res) => {
  const { email, password } = req.body;
  const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'User already exists or insert failed.' });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
});

// Login Route
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.length > 0) {
      res.json({ message: 'Login successful', token: 'dummy-token' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});

// Start Server
app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
