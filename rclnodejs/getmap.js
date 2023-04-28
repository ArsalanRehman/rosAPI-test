const rclnodejs = require('rclnodejs');
// const msg = rclnodejs.require('nav_msgs/msg/OccupancyGrid').msg;

async function run() {
  try {
    await rclnodejs.init();
    const node = rclnodejs.createNode('subscriber_node');
    const sub = node.createSubscription(
      'std_msgs/msg/String',
      '/topic',
      (msg) => {
        console.log(msg);
      }
    );
    setTimeout(() => {
      console.log('Unsubscribing from the topic');
      node.destroySubscription(sub);
    }, 5000);
    rclnodejs.spin(node);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

run();
