const rclnodejs = require('rclnodejs');

exports.init_ros = async () => {
  if (rclnodejs.isShutdown()) {
    await rclnodejs.init();
  }
};
exports.get_rclnodejs = () => {
  return rclnodejs;
};
exports.shutdown_rclnodejs = () => {
  rclnodejs.shutdown();
};

