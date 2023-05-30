const rclnodejs = require('rclnodejs');
const Fibonacci = rclnodejs.require('test_msgs/action/Fibonacci');
const GoalStatus = rclnodejs.require('action_msgs/msg/GoalStatus');

class FibonacciActionClient {
  constructor(node) {
    this._node = node;

    this._actionClient = new rclnodejs.ActionClient(
      node,
      'test_msgs/action/Fibonacci',
      'fibonacci'
    );
  }

  async sendGoal() {
    this._node.getLogger().info('Waiting for action server...');
    await this._actionClient.waitForServer();

    const goal = new Fibonacci.Goal();
    goal.order = 10;

    this._node.getLogger().info('Sending goal request...');

    const goalHandle = await this._actionClient.sendGoal(goal, (feedback) =>
      this.feedbackCallback(feedback)
    );

    if (!goalHandle.isAccepted()) {
      this._node.getLogger().info('Goal rejected');
      return;
    }

    this._node.getLogger().info('Goal accepted');

    const result = await goalHandle.getResult();

    if (goalHandle.isSucceeded()) {
      this._node
        .getLogger()
        .info(`Goal suceeded with result: ${result.sequence}`);
    } else {
      this._node.getLogger().info(`Goal failed with status: ${status}`);
    }

    rclnodejs.shutdown();
  }

  feedbackCallback(feedback) {
    this._node.getLogger().info(`Received feedback: ${feedback.sequence}`);
  }
}

rclnodejs
  .init()
  .then(() => {
    const node = rclnodejs.createNode('action_client_example_node');
    const client = new FibonacciActionClient(node);

    client.sendGoal();

    rclnodejs.spin(node);
  })
  .catch((err) => {
    console.error(err);
  });
