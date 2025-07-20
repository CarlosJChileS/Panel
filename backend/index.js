require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const dbFile = process.env.DB_FILE || path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbFile);
const schemaPath = path.join(__dirname, '..', 'scripts', 'sqlite_schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');
db.exec(schema, (err) => {
  if (err) console.error('Error applying schema', err);
});

app.get('/status', (_req, res) => {
  db.get('SELECT id FROM cities LIMIT 1', (err) => {
    if (err) {
      return res.status(500).json({ status: 'error' });
    }
    res.json({ status: 'ok' });
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
