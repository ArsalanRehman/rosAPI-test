// const rclnodejs = require('rclnodejs');
// const Fibonacci = rclnodejs.require('test_msgs/action/Fibonacci');
// const GoalStatus = rclnodejs.require('action_msgs/msg/GoalStatus');
// const DriveGoal = rclnodejs.require('find_v_marker/action/DriveGoal');

// class FibonacciActionClient {
//   constructor(node) {
//     this._node = node;

//     this._actionClient = new rclnodejs.ActionClient(
//       node,
//       'find_v_marker/action/DriveGoal',
//       DriveGoal
//     );
//   }

//   async sendGoal() {
//     this._node.getLogger().info('Waiting for action server...');
//     await this._actionClient.waitForServer();

//     const goal = new Fibonacci.Goal();
//     goal.order = 10;

//     this._node.getLogger().info('Sending goal request...');

//     const goalHandle = await this._actionClient.sendGoal(goal, (feedback) =>
//       this.feedbackCallback(feedback)
//     );

//     if (!goalHandle.isAccepted()) {
//       this._node.getLogger().info('Goal rejected');
//       return;
//     }

//     this._node.getLogger().info('Goal accepted');

//     const result = await goalHandle.getResult();

//     if (goalHandle.isSucceeded()) {
//       this._node
//         .getLogger()
//         .info(`Goal suceeded with result: ${result.sequence}`);
//     } else {
//       this._node.getLogger().info(`Goal failed with status: ${status}`);
//     }

//     rclnodejs.shutdown();
//   }

//   feedbackCallback(feedback) {
//     this._node.getLogger().info(`Received feedback: ${feedback.sequence}`);
//   }
// }

// rclnodejs
//   .init()
//   .then(() => {
//     const node = rclnodejs.createNode('action_client_example_node');
//     const client = new FibonacciActionClient(node);

//     client.sendGoal();

//     rclnodejs.spin(node);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

////////////////////////////////////////////////////////////
// const rclnodejs = require('rclnodejs');
// const DriveGoal = rclnodejs.require('./DriveGoal');

// async function main() {
//   await rclnodejs.init();
//   const node = rclnodejs.createNode('drive_goal_client');
//   // const DriveGoal = './DriveGoal.action';

//   const client = node.createClient(DriveGoal, 'drive_goal');

//   const request = {
//     goal_pose: {
//       header: {
//         stamp: {
//           sec: Math.floor(Date.now() / 1000),
//           nanosec: Date.now() * 1000,
//         },
//         frame_id: 'map',
//       },
//       pose: {
//         position: { x: 6.0, y: 18.0, z: 0.0 },
//         orientation: { x: 0.0, y: 0.0, z: 0.0, w: 0.0 },
//       },
//     },
//   };

//   client
//     .waitForService()
//     .then(async () => {
//       console.log('Client working');
//       const result = await client.sendRequest(request);
//       console.log('Result:', result.result);
//       rclnodejs.shutdown();
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

// main();

const rclnodejs = require('rclnodejs');
const DriveGoal = require('./DriveGoal');

class DriveGoalClient extends rclnodejs.Node {
  constructor() {
    super('drive_goal_client');

    this.actionClient = new rclnodejs.ActionClient(
      this,
      DriveGoal.action_type,
      'drive_goal'
    );

    this.sendData();
  }

  async sendData() {
    this.getLogger().info('Client working');

    const goalRequest = new DriveGoal.Goal();
    const now = Math.floor(Date.now() / 1000);

    goalRequest.goal_pose.header.stamp.sec = now;
    goalRequest.goal_pose.header.stamp.nanosec = 0;
    goalRequest.goal_pose.header.frame_id = 'map';
    goalRequest.goal_pose.pose.position.x = 6.0;
    goalRequest.goal_pose.pose.position.y = 18.0;
    goalRequest.goal_pose.pose.position.z = 0.0;
    goalRequest.goal_pose.pose.orientation.x = 0.0;
    goalRequest.goal_pose.pose.orientation.y = 0.0;
    goalRequest.goal_pose.pose.orientation.z = 0.0;
    goalRequest.goal_pose.pose.orientation.w = 0.0;

    await this.actionClient.waitForServer();

    const goalHandle = await this.actionClient.sendGoal(
      goalRequest,
      (feedback) => this.feedbackCallback(feedback)
    );

    if (!goalHandle.isAccepted()) {
      this.getLogger().info('Goal rejected :(');
      return;
    }

    this.getLogger().info('Goal accepted :)');

    const result = await goalHandle.getResult();

    this.getLogger().info(`Result: ${result.result}`);

    rclnodejs.shutdown();
  }

  feedbackCallback(feedback) {
    const feedbackMsg = feedback.current_pose.pose;
    this.getLogger().info(`Feedback: ${feedbackMsg}`);
  }
}

function main() {
  rclnodejs
    .init()
    .then(() => {
      const minimalClient = new DriveGoalClient();
      rclnodejs.spin(minimalClient);
    })
    .catch((err) => {
      console.error(err);
    });
}

main();
