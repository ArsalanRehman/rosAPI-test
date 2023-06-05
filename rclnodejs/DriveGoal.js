const rclnodejs = require('rclnodejs');

const geometry_msgs = rclnodejs.require('geometry_msgs');
const action_msgs = rclnodejs.require('action_msgs');

const DriveGoal = {
  action_type: 'find_v_marker/action/DriveGoal',
  goal_type: {
    goal_pose: {
      header: action_msgs.msg.Header,
      pose: geometry_msgs.msg.PoseStamped,
    },
  },
  result_type: {
    result: 'bool', // Updated: Assign 'bool' as the result type
  },
  feedback_type: {
    current_pose: {
      pose: geometry_msgs.msg.PoseStamped,
    },
  },
};

module.exports = DriveGoal;
