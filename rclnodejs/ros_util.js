const rclnodejs = require('rclnodejs');

exports.init_ros = async () => {
  if (rclnodejs.isShutdown()) {
    await rclnodejs.init();
  }
  // if (!is_ros_init) {
  //   is_ros_init = true;
  // }
};
exports.get_rclnodejs = () => {
  return rclnodejs;
};
exports.shutdown_rclnodejs = () => {
  rclnodejs.shutdown();
};

function sub(rclnodejs) {
  const node = new rclnodejs.Node('publisher_example_node');
  const publisher = node.createPublisher('std_msgs/msg/String', 'topic');
  node.createSubscription('std_msgs/msg/String', 'topic', (msg) => {
    console.log(`Received message: ${typeof msg}`, msg);
  });

  let timer = node.createTimer(1000, () => {
    console.log('One second escaped!');

    // console.log('Cancel this timer.');
    // timer.cancel();

    if (timer.isCanceled()) {
      console.log('The timer has been canceled successfully.');
    }

    console.log('Reset the timer.');
    timer.reset();
    console.log(
      'The next call will be ' + timer.timeUntilNextCall() + 'ms later.'
    );
  });
  node.spin();
}
// sub();
