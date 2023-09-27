const rclnodejs = require('rclnodejs');

rclnodejs.init().then(() => {
  const node = new rclnodejs.Node('time_example_node');

  setInterval(() => {
    const now = new rclnodejs.Time();
    console.log(`Current time: ${now.nanoseconds}`);
  }, 1000);

  node.spin();
});
