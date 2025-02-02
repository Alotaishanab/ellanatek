// /config/db.js
const sqlite3 = require('better-sqlite3');
const db = sqlite3('contacts.db');

// Create contacts table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT,
    lastName TEXT,
    email TEXT,
    phoneNumber TEXT,
    businessName TEXT,
    inquiryType TEXT,
    message TEXT,
    isUnsubscribed INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

// Add 'isUnsubscribed' column if it doesn't exist
try {
  db.prepare(`
    ALTER TABLE contacts 
    ADD COLUMN isUnsubscribed INTEGER DEFAULT 0
  `).run();
} catch (err) {
  if (!err.message.includes('duplicate column name')) {
    throw err;
  }
}

module.exports = db;
