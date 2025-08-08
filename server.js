const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Feedback submission
app.post('/api/feedback', async (req, res) => {
  const { name, feedback } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO feedback (name, feedback) VALUES ($1, $2) RETURNING *',
      [name, feedback]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => console.log(`Server running on ${port}`));
