const rclnodejs = require('rclnodejs');
const WebSocket = require('ws');
function joystick() {
  try {
    rclnodejs.init().then(() => {
      // Create a ROS node
      const node = rclnodejs.createNode('websocket_publisher');

      // Create a publisher for the cmd_vel topic
      const publisher = node.createPublisher(
        'geometry_msgs/msg/Twist',
        'cmd_vel'
      );

      // Create a WebSocket server
      const wss = new WebSocket.Server({ port: 8080 });

      // Handle incoming WebSocket connections
      wss.on('connection', (ws) => {
        console.log('A client has connected.');

        // Handle incoming messages from clients
        ws.on('message', (message) => {
          console.log('Received message:', message);

          // Create a new Twist message
          const twist = new rclnodejs.messageObject('geometry_msgs/msg/Twist');
          // Set the linear x component of the Twist message based on the received message
          twist.linear.x = parseFloat(message);

          // Publish the Twist message on the cmd_vel topic
          publisher.publish(twist);

          // Send a response back to the client
          const response = `Server received: ${message}`;
          ws.send(response);
        });

        // Handle WebSocket connection close
        ws.on('close', () => {
          console.log('A client has disconnected.');
        });
      });

      rclnodejs.spin(node);
    });
  } catch (error) {
    console.log(error);
  }
}

joystick();