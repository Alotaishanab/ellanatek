/**
 * Sysolution mock bike – local dev only
 * -------------------------------------
 * • Simulates handshake + heartbeat
 * • Prints any JSON commands sent by your server
 *
 * ENV OVERRIDES
 *   MOCK_TARGET  full ws:// URL   (default ws://localhost:8081/?id=mockBike)
 *   MOCK_SERIAL  serial string   (default y10-618-01234)
 *   WS_PORT     alt port shortcut
 */

const WebSocket = require('ws');
function log(m) { console.log(`[Mock] ${m}`); }

const PORT   = process.env.WS_PORT || 8081;
const TARGET = process.env.MOCK_TARGET || `ws://localhost:${PORT}/?id=mockBike`;
const SERIAL = process.env.MOCK_SERIAL || 'y10-618-01234';

const ws = new WebSocket(TARGET);

ws.on('open', () => {
  log(`Connected to ${TARGET}`);
  ws.send(SERIAL);                     // packet 1 – serial
  ws.send(Buffer.from([0xaa]));        // packet 2 – dummy binary
  ws.send(Buffer.from([0xbb]));        // packet 3 – dummy binary
  log('Handshake packets sent');

  // heartbeat every 10 s
  setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) ws.send('');
  }, 10_000);
});

ws.on('message', (data) => {
  if (data.length === 0) return;       // ignore empty heartbeat echo
  log(`server → ${data}`);
  try {
    const msg = JSON.parse(data.toString());
    if (msg._type === 'GetCardInfo') {
      const cardInfo = {
        _type: 'CardInfo',
        cardId: SERIAL,
        commandId: msg.id,
        card: {
          alias: 'MockBike',
          width: 1280,
          height: 512,
          brightness: 70,
          volume: 50,
          netType: 'ETH'
        }
      };
      ws.send(JSON.stringify(cardInfo));
      log('CardInfo sent');
    }
  } catch { /* non-JSON */ }
});

ws.on('close',  () => log('Connection closed'));
ws.on('error', (e)=> log('WS error: ' + e.message));
