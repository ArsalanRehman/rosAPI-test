const context = require("./ros_util");

context.init_ros();
context.shutdown_rclnodejs();
context.init_ros();
const rclnodejs = context.get_rclnodejs();

exports.ros = async (rclnodejs) => {
  const node = new rclnodejs.Node("publisher_example_node");
  const publisher = node.createPublisher("std_msgs/msg/String", "topic");

  let timer = node.createTimer(1000, () => {
    console.log("One second escaped!");
    publisher.publish("Hello");
  });
  node.spin();
};

this.ros(rclnodejs);
