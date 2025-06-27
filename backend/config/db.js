// /config/db.js   – Better-SQLite3 single-file DB
// ------------------------------------------------
//  NEW:  payments table  +  bookings.paid column
// ------------------------------------------------

const sqlite3 = require('better-sqlite3');
const db      = sqlite3('contacts.db');

// ---------- contacts (legacy) ----------
db.prepare(`
  CREATE TABLE IF NOT EXISTS contacts (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName      TEXT,
    lastName       TEXT,
    email          TEXT,
    phoneNumber    TEXT,
    businessName   TEXT,
    inquiryType    TEXT,
    message        TEXT,
    isUnsubscribed INTEGER  DEFAULT 0,
    createdAt      DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

// ---------- users ----------
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    email         TEXT UNIQUE,
    passwordHash  TEXT,
    role          TEXT DEFAULT 'advertiser',
    phone         TEXT UNIQUE,
    phoneVerified INTEGER DEFAULT 0,
    verified      INTEGER DEFAULT 0,
    createdAt     DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt     DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

// ---------- ads (includes active flag) ----------
db.prepare(`
  CREATE TABLE IF NOT EXISTS ads (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    uploaderId      INTEGER,
    filename        TEXT,
    url             TEXT,
    duration        INTEGER,
    status          TEXT DEFAULT 'pending',   -- pending | approved | rejected
    active          INTEGER DEFAULT 1,        -- 1 = live, 0 = paused
    rejectionReason TEXT,
    approvedBy      INTEGER,
    createdAt       DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt       DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();
try { db.prepare(`ALTER TABLE ads ADD COLUMN active INTEGER DEFAULT 1`).run(); } 
catch(e){ if(!/duplicate column/i.test(e.message)) throw e; }

// ---------- bookings (now with paid flag) ----------
db.prepare(`
  CREATE TABLE IF NOT EXISTS bookings (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    motorbikeId   TEXT,
    adId          INTEGER,
    startTime     DATETIME,
    endTime       DATETIME,
    volume        INTEGER DEFAULT 80,
    brightness    INTEGER DEFAULT 100,
    paid          INTEGER DEFAULT 0            -- 1 = Stripe succeeded
  )
`).run();
try { db.prepare(`ALTER TABLE bookings ADD COLUMN paid INTEGER DEFAULT 0`).run(); }
catch(e){ if(!/duplicate column/i.test(e.message)) throw e; }

// ---------- phone_tokens ----------
db.prepare(`
  CREATE TABLE IF NOT EXISTS phone_tokens (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    userId     INTEGER,
    code       TEXT,
    expiresAt  DATETIME,
    used       INTEGER DEFAULT 0
  )
`).run();

// ---------- controllers ----------
db.prepare(`
  CREATE TABLE IF NOT EXISTS controllers (
    serialId   TEXT PRIMARY KEY,
    alias      TEXT,
    width      INTEGER,
    height     INTEGER,
    brightness INTEGER,
    lastSeen   DATETIME
  )
`).run();

// ---------- payments (Stripe) ----------
db.prepare(`
  CREATE TABLE IF NOT EXISTS payments (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    amount    INTEGER,          -- cents
    currency  TEXT DEFAULT 'usd',
    intentId  TEXT UNIQUE,
    status    TEXT,             -- requires_payment_method | succeeded | canceled
    userId    INTEGER,
    bookingId INTEGER,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

// ---------- Indexes ----------
db.prepare(`CREATE INDEX IF NOT EXISTS idx_booking_active  ON bookings (motorbikeId,startTime,endTime)`).run();
db.prepare(`CREATE INDEX IF NOT EXISTS idx_booking_paid    ON bookings (paid)`).run();
db.prepare(`CREATE UNIQUE INDEX IF NOT EXISTS idx_user_email ON users (email)`).run();
db.prepare(`CREATE INDEX IF NOT EXISTS idx_ad_status       ON ads (status)`).run();
db.prepare(`CREATE INDEX IF NOT EXISTS idx_ad_active       ON ads (active)`).run();
db.prepare(`CREATE INDEX IF NOT EXISTS idx_payment_intent  ON payments (intentId)`).run();

module.exports = db;
