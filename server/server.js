const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Default XAMPP password
  database: 'recipe_db',
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
  } else {
    console.log('✅ Connected to MySQL database');
  }
});

// ✅ Register Endpoint
app.post('/auth/register', (req, res) => {
  const { email, password } = req.body;

  const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'User already exists or failed' });
    } else {
      res.status(201).json({ message: 'User registered successfully' });
    }
  });
});

// ✅ Login Endpoint
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: 'Login failed' });

    if (results.length > 0) {
      res.json({ message: 'Login successful', token: 'dummy-token' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});

// ✅ Add Recipe Endpoint
app.post('/recipes', (req, res) => {
  const { name, ingredients, instructions, thumbnail } = req.body;

  const sql = 'INSERT INTO recipes (name, ingredients, instructions, thumbnail) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, ingredients, instructions, thumbnail], (err, result) => {
    if (err) {
      console.error('❌ Error inserting recipe:', err);
      return res.status(500).json({ error: 'Failed to add recipe' });
    }
    res.status(201).json({ message: '✅ Recipe added successfully' });
  });
});

// ✅ Get All Recipes
app.get('/recipes', (req, res) => {
  const sql = 'SELECT * FROM recipes ORDER BY created_at DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error fetching recipes:', err);
      return res.status(500).json({ error: 'Failed to fetch recipes' });
    }
    res.json(results);
  });
});

// ✅ Get Recipe by ID
app.get('/recipes/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM recipes WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('❌ Error fetching recipe:', err);
      return res.status(500).json({ error: 'Failed to fetch recipe' });
    }

    if (result.length === 0) {
      res.status(404).json({ error: 'Recipe not found' });
    } else {
      res.json(result[0]);
    }
  });
});

// ✅ Server Listening
app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
