// try {
//   const rclnodejs = await rosContext.getROSContext();
//   const node = rclnodejs.createNode('publish_joystick');
//   // const node = rosSingleton.getROSNode();

//   const publisher = node.createPublisher(
//     process.env.ROS2_joystickTopicType,
//     process.env.ROS2_joystickTopicName
//   );

//   // Create a WebSocket server
//   const wss = new WebSocket.Server({ port: 8080 });

//   // Handle incoming WebSocket connections
//   wss.on('connection', (ws) => {
//     console.log('A client has connected.');

//     // Handle incoming messages from clients
//     ws.on('message', (message) => {
//       // console.log('Received message:', message);
//       try {
//         const { linear, angular } = JSON.parse(message);

//         // Publish the Twist message on the cmd_vel topic
//         publisher.publish({
//           linear: {
//             x: linear.x,
//             y: 0,
//             z: 0,
//           },
//           angular: {
//             x: 0,
//             y: 0,
//             z: angular.z,
//           },
//         });

//         // Send a response back to the client
//         const response = `Server received: ${message}`;
//         ws.send(response);
//         // rclnodejs.shutdown();
//       } catch (error) {
//         console.log(error);
//       }
//     });

//     // Handle WebSocket connection close
//     ws.on('close', () => {
//       console.log('A client has disconnected.');
//     });
//   });

//   rclnodejs.spin(node);
// } catch (error) {
//   console.log(error);
//   // res.status(500).json({ err });
// }
