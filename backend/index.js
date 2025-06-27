// backend/index.js
//
//  Starts Ellanatek HTTP + WebSocket stack and serves Swagger docs.
//

require('dotenv').config();
const express   = require('express');
const path      = require('path');
const cors      = require('cors');
const rateLimit = require('express-rate-limit');

console.log('✅ index.js starting…');

// ---------- DB bootstrap (Sequelize) -----------------------------
const { sequelize } = require('./models');
sequelize.sync().then(() => console.log('✅ DB synced'));

// ---------- Express app -----------------------------------------
const app = express();
app.use(express.json());
app.use(cors());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// ---------- Swagger ------------------------------------------------
const { swaggerSpec, swaggerUi } = require('./config/swagger');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/openapi.json', (_, res) => res.json(swaggerSpec));

// ---------- Static assets -----------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// ---------- API routes --------------------------------------------
app.use('/api', require('./routes/auth'));
app.use('/api', require('./routes/contact'));
app.use('/api', require('./routes/contacts'));
app.use('/api', require('./routes/unsubscribe'));
app.use('/api', require('./routes/email'));
app.use('/api', require('./routes/ads'));
app.use('/api', require('./routes/payments'));

try {
  app.use('/api', require('./routes/controller'));
  console.log('✅ routes/controller.js loaded');
} catch (err) {
  console.error('❌ Failed to load routes/controller.js:', err);
}

// ---------- Start HTTP server -------------------------------------
const PORT = process.env.PORT || 5004;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
