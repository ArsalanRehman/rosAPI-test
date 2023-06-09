const rclnodejs = require('rclnodejs');
async function getPose() {
  var poseData = {};
  try {
    await rclnodejs.init();
    const node = rclnodejs.createNode('getPose');
    const sub = node.createSubscription(
      'geometry_msgs/msg/PoseWithCovarianceStamped',
      '/pose',
      async (msg) => {
        // console.log(msg);
        poseData = msg;
        console.log(poseData.pose.pose.position);
      }
    );
    rclnodejs.spin(node);
  } catch (error) {
    console.log(error);
  }
}
getPose();
