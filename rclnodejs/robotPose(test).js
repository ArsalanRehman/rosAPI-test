// const rclnodejs = require('rclnodejs');
// async function getPose() {
//   var poseData = [];
//   try {
//     await rclnodejs.init();
//     const node = new rclnodejs.Node('getPose');
//     const sub = node.createSubscription(
//       'geometry_msgs/msg/PoseWithCovarianceStamped',
//       '/pose',
//       async (msg) => {
//         // console.log(msg);
//         poseData.push(msg.pose.pose.position);
//         // poseData = msg;
//         console.log(poseData);
//       }
//     );
//     console.log(sub.isDestroyed);
//     node.spin();
//   } catch (error) {
//     console.log(error);
//   }
// }
// getPose();


  var poseData = [];

const rcl = require('./rclUtilTest');
rcl
  .init_ros()
  .then(async () => {
    const rclnodejs = rcl.get_rclnodejs();
    const node = new rclnodejs.Node('getPose');
    const sub = node.createSubscription(
      'geometry_msgs/msg/PoseWithCovarianceStamped',
      '/pose',
      async (msg) => {
        // console.log(msg);
        poseData.push(msg.pose.pose.position);
        // poseData = msg;
        console.log(poseData);
      }
    );
    console.log(sub.isDestroyed);
    node.spin();
  })
  .catch((err) => {
    console.log(err);
  });
