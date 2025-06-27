/**
 * @swagger
 * tags: [Controller]
 *
 * /api/ws-health:
 *   get:
 *     summary: Current number of connected LED controllers
 *     tags: [Controller]
 *     responses:
 *       200:
 *         description: Connections count
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 connections: { type: integer }
 */

const express = require('express');
const router  = express.Router();
const WebSocket = require('ws');

const port = process.env.WS_PORT || 8081;
const wss  = new WebSocket.Server({ port });

const controllers = new Map();
console.log(`✅ WebSocket server starting on port ${port}…`);

wss.on('connection', (ws, req) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const motorbikeId = url.searchParams.get('id');
  if (!motorbikeId) return ws.close(1008,'No motorbike id');

  controllers.set(motorbikeId, ws);
  console.log(`🟢 Controller ${motorbikeId} connected`);

  ws.on('close', () => {
    controllers.delete(motorbikeId);
    console.log(`🔴 Controller ${motorbikeId} disconnected`);
  });
});

setInterval(() => {
  for (const [id, ws] of controllers) {
    const payload = { type:'idle', motorbikeId:id, timestamp: new Date().toISOString() };
    try { ws.send(JSON.stringify(payload)); } catch(e){ console.error('WS send',e); }
  }
}, 10_000);

router.get('/ws-health', (_req,res) =>
  res.json({ connections: controllers.size })
);

console.log(`✅ WebSocket server listening on port ${port}`);
module.exports = router;
