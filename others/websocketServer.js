const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8586 }); // You can use any port you prefer

// Listen for WebSocket connections
wss.on('connection', (socket) => {
  console.log('Client connected.');

  // Listen for incoming messages from clients
  socket.on('message', (message) => {
    try {
      const parsedMessage = JSON.parse(message);
      console.log('Received message:', parsedMessage);

      // Process the received message here, e.g., broadcast to other clients, store in a database, etc.
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });

  // Handle disconnection
  socket.on('close', () => {
    console.log('Client disconnected.');
  });
});

console.log('WebSocket server is listening on port 8080.');
