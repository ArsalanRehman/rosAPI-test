const rclnodejs = require('rclnodejs');

async function run() {
  try {
    await rclnodejs.init();
    const node = rclnodejs.createNode('subscriber_node');
    const sub = node.createSubscription(
      '/map',
      'nav_msgs/OccupancyGrid',
      (msg) => {
        console.log(`Received message: ${msg.data}`);
      }
    );
    rclnodejs.spin(node);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

run();
