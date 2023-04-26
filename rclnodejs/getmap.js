const rclnodejs = require('rclnodejs');
const msg = rclnodejs.require('nav_msgs/msg/OccupancyGrid').msg;

async function run() {
  try {
    await rclnodejs.init();
    const node = rclnodejs.createNode('subscriber_node');
    const sub = node.createSubscription(
      'nav_msgs/msg/OccupancyGrid',
      '/map',
      (msg) => {
        console.log(msg);
      }
    );
    rclnodejs.spin(node);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

run();
