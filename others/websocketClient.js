const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8585');

ws.on('open', () => {
  console.log('Connected to WebSocket server.');
});

// WebSocket 'message' event handler
ws.on('message', (msg) => {
  try {
    const data = JSON.parse(msg);
    // console.log(data);
    setInterval(() => {
      // console.log(object);
      console.log('liveMap', data.base64Map);
      // console.log('robotPose', data.robotPose);
    }, 3000);

    // For example, update a visualization, store in a database, etc.
  } catch (error) {
    console.error('Error parsing pose data:', error);
  }
});

// WebSocket 'close' event handler
ws.on('close', () => {
  console.log('WebSocket connection closed.');
});

// WebSocket 'error' event handler
ws.on('error', (error) => {
  console.error('WebSocket error:', error);
});
