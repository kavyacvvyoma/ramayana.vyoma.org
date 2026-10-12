const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React frontend build
app.use(express.static(path.join(__dirname, 'build')));

// Initialize SQLite Database
const dbPath = path.resolve(__dirname, 'server', 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database at:', dbPath);
    
    // Serialize queries during initialization to ensure they execute in order
    db.serialize(() => {
      // Create tables if they don't exist
      db.run(`
        CREATE TABLE IF NOT EXISTS quiz_submissions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          week_id TEXT,
          name TEXT,
          email TEXT,
          phone TEXT,
          score INTEGER,
          answers TEXT,
          submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Run migration alter query to add answers column if it is missing from legacy database files
      db.run("ALTER TABLE quiz_submissions ADD COLUMN answers TEXT", (err) => {
        if (err) {
          // Ignored if column already exists or table was newly created with it
          console.log("Migration (answers column status):", err.message);
        } else {
          console.log("Migration: Added 'answers' column to quiz_submissions.");
        }
      });

      db.run(`
        CREATE TABLE IF NOT EXISTS analytics_events (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          event_name TEXT,
          event_data TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
    });
  }
});

// API Routes

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Check if user already attempted the quiz
app.get('/api/quiz/check', (req, res) => {
  const { week_id, email, phone } = req.query;
  
  if (!week_id || !email || !phone) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  const query = `SELECT id FROM quiz_submissions WHERE week_id = ? AND (email = ? OR phone = ?)`;
  db.get(query, [week_id, email, phone], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database check failed' });
    }
    res.json({ exists: !!row });
  });
});

// Save Quiz Submission
app.post('/api/quiz', (req, res) => {
  const { week_id, name, email, phone, score, answers } = req.body;
  
  if (!week_id || !name || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = `INSERT INTO quiz_submissions (week_id, name, email, phone, score, answers) VALUES (?, ?, ?, ?, ?, ?)`;
  db.run(query, [week_id, name, email, phone, score, answers], function(err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to save submission' });
    }
    res.json({ success: true, id: this.lastID });
  });
});

// Get all Quiz Submissions (for Admin Dashboard)
app.get('/api/quiz', (req, res) => {
  db.all(`SELECT * FROM quiz_submissions ORDER BY submitted_at DESC`, [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch submissions' });
    }
    res.json(rows);
  });
});

// Save Analytics Event (Optional Custom Tracking)
app.post('/api/analytics', (req, res) => {
  const { event_name, event_data } = req.body;
  
  const query = `INSERT INTO analytics_events (event_name, event_data) VALUES (?, ?)`;
  db.run(query, [event_name, JSON.stringify(event_data || {})], function(err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to save event' });
    }
    res.json({ success: true, id: this.lastID });
  });
});

// Get Analytics Events (for Admin Dashboard)
app.get('/api/analytics', (req, res) => {
  db.all(`SELECT * FROM analytics_events ORDER BY created_at DESC LIMIT 1000`, [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch events' });
    }
    res.json(rows);
  });
});

// For any other request, send back React's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
