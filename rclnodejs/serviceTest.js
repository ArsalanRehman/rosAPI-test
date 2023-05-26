const rclnodejs = require('rclnodejs');

// async function main() {
//   // Initialize the ROS node
//   await rclnodejs.init();

//   // Create a Node
//   const node = rclnodejs.createNode('service_caller');

//   // Create a Client to call the service
//   const client = node.createClient(
//     'slam_toolbox/srv/Pause',
//     '/slam_toolbox/pause_new_measurements'
//   );

//   try {
//     // Create an empty request message (since the service doesn't require any inputs)
//     const request = new rclnodejs.example_msgs.srv.Trigger.Request();

//     // Call the service
//     await client.sendRequest(request);

//     console.log('Service triggered successfully!');
//   } catch (error) {
//     console.error('Service call failed:', error);
//   }

//   // Shutdown the ROS node
//   rclnodejs.shutdown();
// }

// // Run the main function
// main();

////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////