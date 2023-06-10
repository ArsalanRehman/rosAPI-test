const rclnodejs = require('rclnodejs');

rclnodejs
  .init()
  .then(() => {
    const node = rclnodejs.createNode('client_example_node');

    const client = node.createClient(
      'amr_interfaces/srv/DriveGoal',
      '/drive_goal'
    );
    const request = {
      goal_pose: {
        position: { x: 1.0, y: 2.0, z: 0.5 },
        orientation: { x: 0.0, y: 0.0, z: 0.0, w: 1.0 },
      },
    };
    client.waitForService(1000).then((result) => {
      if (!result) {
        console.log('Error: service not available');
        return;
      }
      console.log(request);
      client.sendRequest(request, (response) => {
        console.log(`Result: ${typeof response}`, response);
        rclnodejs.shutdown();
      });
    });

    rclnodejs.spin(node);
  })
  .catch((e) => {
    console.log(`Error: ${e}`);
  });
