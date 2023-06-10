const rclnodejs = require('rclnodejs');

async function liveMap(req, res) {
  try {
    await rclnodejs.init();
    const node = rclnodejs.createNode('testNodeRCL');
    const sub = node.createSubscription(
      'std_msgs/msg/String',
      '/live_map',
      async (msg) => {
        console.log(msg);
      }
    );
    rclnodejs.spin(node);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
    });
  }
}
liveMap();
