/**
 * Sysolution WebSocket server – production-ready
 * ----------------------------------------------
 * • Listens on WS_PORT (default 8081)
 * • Handles 3-packet handshake from Sysolution boxes
 * • Responds with GetCardInfo request
 * • Logs CardInfo, heartbeat, and keeps map of live boxes
 * • Exports pushAd() helper for ad playback commands
 */

require('dotenv').config();
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const PORT = process.env.WS_PORT || 8081;

// Tiny logger -----------------------------------------------------------
function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  fs.appendFileSync(path.join(__dirname, 'sysolution_ws.log'), line + '\n');
}

// Map serialID → websocket
const controllers = new Map();

// Start server ----------------------------------------------------------
const wss = new WebSocket.Server({ port: PORT }, () =>
  log(`✅ Sysolution WS server listening on :${PORT}`)
);

wss.on('connection', (ws) => {
  log('🔌 Raw socket connected');
  let stage = 0;          // handshake stage
  let serialID = 'unknown';

  ws.on('message', (data, isBinary) => {
    try {
      // 1 – serial ID
      if (stage === 0) {
        serialID = data.toString().trim();
        controllers.set(serialID, ws);
        log(`🟢 Controller ${serialID} connected`);

        ws.send(JSON.stringify({ _type: 'GetCardInfo', id: 'first' }));
        stage = 1;
        return;
      }

      // 2 & 3 – two binary packets we ignore
      if (stage === 1 || stage === 2) {
        stage++;
        return;
      }

      // Operational ----------------------------------------------------
      if (isBinary || data.length === 0) {
        // heartbeat
        ws.send('');
        return;
      }

      let json;
      try { json = JSON.parse(data.toString()); } catch { /* ignore */ }

      if (json) {
        if (json._type === 'CardInfo') {
          log(`📇 CardInfo ${serialID}: ${json.card.width}×${json.card.height}, brightness ${json.card.brightness}`);
        } else {
          log(`📥 ${serialID} JSON: ${data}`);
        }
      } else {
        log(`⚠️  ${serialID} non-JSON text ignored`);
      }
    } catch (err) {
      log(`❌ ${serialID} handler error: ${err.message}`);
    }
  });

  ws.on('close', () => {
    controllers.delete(serialID);
    log(`🔴 Controller ${serialID} disconnected`);
  });

  ws.on('error', (err) => log(`❌ WS error (${serialID}): ${err.message}`));
});

// Graceful shutdown ------------------------------------------------------
process.on('SIGTERM', () => {
  log('🛑 SIGTERM – closing WebSocket server');
  wss.close(() => process.exit(0));
});

/**
 * pushAd – send Play command to a live box
 * @param {string} serial  controller serialID
 * @param {string} url     full URL to media file
 * @param {Date}   start   play window start
 * @param {Date}   end     play window end
 * @param {number} volume  0-100
 * @param {number} bright  0-100
 */
function pushAd(
  serial,
  url,
  start = new Date(),
  end   = new Date(Date.now() + 10 * 60_000),
  volume = 80,
  bright = 100
) {
  const ws = controllers.get(serial);
  if (!ws || ws.readyState !== WebSocket.OPEN)
    throw new Error(`Controller ${serial} not connected`);

  const payload = {
    _type: 'Play',
    ad_url: url,
    play_start: start.toISOString(),
    play_end: end.toISOString(),
    volume,
    brightness: bright
  };
  ws.send(JSON.stringify(payload));
  log(`🚀 Pushed ad to ${serial}: ${url}`);
}

module.exports = { pushAd };
