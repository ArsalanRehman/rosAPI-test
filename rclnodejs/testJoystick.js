const WebSocket = require('websocket').client;

// Create a new WebSocket client
const client = new WebSocket();

// Connect to the WebSocket server
client.connect('ws://192.168.108.203:8080');

// Handle WebSocket connection open
client.on('connect', (connection) => {
  console.log('Connected to server.');

  // Send messages to the server
  setInterval(() => {
    // Create a JSON message with linear.x and angular.z values
    const message = JSON.stringify({ linear: { x: 0.5 }, angular: { z: 0.2 } });

    // Send the message via WebSocket
    connection.send(message);
  }, 10);
});

// Handle WebSocket connection close
client.on('close', () => {
  console.log('Connection closed.');
});

// Handle WebSocket connection errors
client.on('connectFailed', (error) => {
  console.error('Connection error:', error.toString());
});
