//listening to the /robot_pose topic to get the live location of robot
// rosUtil
//   .init_ros()
//   .then(async () => {
//     if (robotPose.length < 1) {
//       const initialPose = await initialPoseFunction();
//       const pose = {
//         position: {
//           x: initialPose.initialPoseX,
//           y: initialPose.initialPoseY,
//           z: 0,
//         },
//         orientation: {
//           roll: 0,
//           pitch: 0,
//           yaw: initialPose.initialPoseYaw,
//         },
//       };
//       robotPose.push(pose);
//     }
//     const sub = singletonNode.createSubscription(
//       process.env.ROS2_robotPoseTopicType,
//       process.env.ROS2_robotPoseTopicName,
//       async (msg) => {
//         const position = msg.pose.pose.position;

//         const orientation = msg.pose.pose.orientation;

//         const euler = conversion.quaternionToEuler(orientation);

//         const pose = {
//           position: position,
//           orientation: euler,
//         };
//         const poseTraceShape = {
//           position: position,
//           orientation: orientation,
//         };
//         traceShape.push(poseTraceShape);
//         if (traceShape.length > 100) {
//           traceShape.shift();
//         }
//         robotPose.push(pose);
//         if (robotPose.length > 100) {
//           //remove the oldest element from array
//           robotPose.shift();
//         }

//         // console.log(robotPose);
//       }
//     );
//   })
//   .catch((err) => {
//     console.log(err);
//   });
