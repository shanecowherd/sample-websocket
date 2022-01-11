'use strict';
const os = require('os');
const express = require('express');
const path = require('path');
const { createServer } = require('http');

const WebSocket = require('ws');

const app = express();
app.use(express.static(path.join(__dirname, '/public')));

const server = createServer(app);
const wss = new WebSocket.Server({ server });
const hostname = os.hostname();

wss.on('connection', function (ws) {
  const id = setInterval(function () {
    ws.send(hostname);
//     ws.send(JSON.stringify(process.memoryUsage()), function () {
//       //
//       // Ignore errors.
//       //
//     });
  }, 1000);
  console.log('started client interval');
  
//   ws.on('message', function message(data) {
//     console.log('received: %s', data);
//     ws.send(hostname);
//   });

  ws.on('close', function () {
    console.log('stopping client interval');
    clearInterval(id);
  });
});

server.listen(8080, function () {
  console.log('Listening on http://0.0.0.0:8080');
});
