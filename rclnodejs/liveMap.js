const rclnodejs = require('rclnodejs');
const Jimp = require('jimp');

async function liveMap(req, res) {
  try {
    await rclnodejs.init();
    const node = rclnodejs.createNode('testNodeRCL');
    const sub = node.createSubscription(
      'std_msgs/msg/String',
      '/live_map',
      async (msg) => {
        console.log(msg);
        // res.status(200).json({
        //   success: true,
        //   data: msg,
        // });
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
