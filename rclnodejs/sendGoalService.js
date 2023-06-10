const rclnodejs = require('rclnodejs');
// rclnodejs
//   .init()
//   .then(() => {
//     let node = rclnodejs.createNode('service_example_node');

//     node.createClient(
//       'amr_interfaces/srv/DriveGoal',
//       '/drive_goal',
//       (request, response) => {
//         console.log(request);

//         // Create a new goal_pose
//         // let newGoalPose = {
//         //   position: { x: 1, y: 2, z: 3 },
//         //   orientation: { x: 0.707, y: 0, z: 0, w: 0.707 },
//         // };

//         // Send the new goal_pose as the response
//         // response.send({ goal_pose: newGoalPose });
//       }
//     );

//     rclnodejs.spin(node);
//   })
//   .catch((e) => {
//     console.log(`Error: ${e}`);
//   });

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

    setInterval(() => {
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
      }, 100);
    });

    rclnodejs.spin(node);
  })
  .catch((e) => {
    console.log(`Error: ${e}`);
  });
