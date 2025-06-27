require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

console.log("✅ index.js starting...");

const app = express();
app.use(express.json());
app.use(cors());

// Basic Rate-Limiting to Prevent DDoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes.',
});
app.use(limiter);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Mount routes
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/contact'));
app.use('/api', require('./routes/contacts'));
app.use('/api', require('./routes/unsubscribe'));
app.use('/api', require('./routes/email'));

// Start Sysolution WebSocket server with error catching
try {
    require('./routes/controller');
    console.log("✅ routes/controller.js loaded successfully.");
} catch (err) {
    console.error("❌ Failed to load routes/controller.js:", err);
}

// Start HTTP Server
const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
