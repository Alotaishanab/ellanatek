const express = require('express');
const WebSocket = require('ws');
const router = express.Router();

// Configurable port (default 8081 for local testing)
const port = process.env.WS_PORT || 8081;

// Create WebSocket server
const wss = new WebSocket.Server({ port });

// -- TEMPORARY: disable DB dependency for initial testing --
// const { Booking, Ad } = require('../models'); 

// Track connected controllers
const controllers = new Map();

// Log WebSocket server startup
console.log(`✅ WebSocket server starting on port ${port}...`);

// Handle incoming WebSocket connections
wss.on('connection', (ws, req) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const motorbikeId = url.searchParams.get('id');
    if (!motorbikeId) {
        ws.close(1008, 'No motorbike id');
        return;
    }
    controllers.set(motorbikeId, ws);
    console.log(`🟢 Controller ${motorbikeId} connected`);

    ws.on('close', () => {
        controllers.delete(motorbikeId);
        console.log(`🔴 Controller ${motorbikeId} disconnected`);
    });
});

// Send test payloads to connected controllers every 10 seconds
setInterval(() => {
    for (const [motorbikeId, ws] of controllers.entries()) {
        const payload = {
            type: "idle",
            test: true,
            motorbikeId,
            timestamp: new Date().toISOString()
        };
        try {
            ws.send(JSON.stringify(payload));
        } catch (err) {
            console.error(`❌ Error sending to ${motorbikeId}:`, err);
        }
    }
}, 10 * 1000);

// Health check endpoint (optional)
router.get('/ws-health', (req, res) => {
    res.json({ connections: controllers.size });
});

console.log(`✅ WebSocket server listening on port ${port}`);

module.exports = router;
