const helper = require('../utils/helperFunctions');
const rosUtil = require('../utils/ros_util');
const singletonNode = require('../utils/rosNode');
const conversion = require('../utils/conversions');
const { QoS } = require('rclnodejs');
const wss = require('../utils/webSocketServer');
const { spawnSync } = require('child_process');

// Global Varriable
var base64Map = null;
var robotPose = [];
var traceShape = [];
var mapMetaData = [];
var pathShape = [];
var batteryData = {
  batteryPercentage: 0,
  batteryStatus: null,
};
var robotConnection = null;

var qos = new QoS();
qos.durability = QoS.DurabilityPolicy.RMW_QOS_POLICY_DURABILITY_TRANSIENT_LOCAL;
qos.reliability = QoS.ReliabilityPolicy.RMW_QOS_POLICY_RELIABILITY_RELIABLE;
async function initialPose() {
  if (robotPose.length < 1) {
    const initialPose = await helper.initialPoseFunction();
    const pose = {
      position: {
        x: initialPose.initialPoseX,
        y: initialPose.initialPoseY,
        z: 0,
      },
      orientation: {
        roll: 0,
        pitch: 0,
        yaw: initialPose.initialPoseYaw,
      },
    };
    robotPose.push(pose);
  }
}
initialPose();
//listening to the /robot_pose topic to get the live location of robot

async function sendRobotData() {
  const robotData = {
    robotPose,
    traceShape,
    base64Map,
    pathShape,
    mapMetaData,
    batteryData,
    robotConnection,
  };
  // Send the pose data via WebSocket to all connected clients
  wss.sendDataToClients(robotData);
}

rosUtil
  .init_ros()
  .then(async () => {
    const subRobotPose = singletonNode.createSubscription(
      process.env.ROS2_robotPoseTopicType,
      process.env.ROS2_robotPoseTopicName,
      async (msg) => {
        // console.log('robotPOse');
        const position = msg.pose.pose.position;
        const orientation = msg.pose.pose.orientation;
        const euler = conversion.quaternionToEulerDegrees(orientation);
        // console.log('euler:', euler);
        const pose = {
          position: position,
          orientation: euler,
        };
        const poseTraceShape = {
          position: position,
          orientation: orientation,
        };
        traceShape.push(poseTraceShape);
        if (traceShape.length > 100) {
          traceShape.shift();
        }
        robotPose.push(pose);
        if (robotPose.length > 100) {
          robotPose.shift();
        }
        sendRobotData();
      }
    );

    //LiveMap
    const subLiveMap = singletonNode.createSubscription(
      process.env.ROS2_liveMapTopicType,
      process.env.ROS2_liveMapTopicName,
      (msg) => {
        // console.log('liveMap');

        // console.log(msg.data);
        // singletonNode.destroySubscription(subLiveMap);
        base64Map = msg;
        sendRobotData();
        // return base64Map;
      }
    );

    //MapMetaData
    const subMapMetaData = singletonNode.createSubscription(
      process.env.ROS2_mapTopicType,
      process.env.ROS2_mapTopicName,
      { qos: qos },
      (msg) => {
        // console.log('MapMetaData');
        // singletonNode.destroySubscription(subMapMetaData);
        mapMetaData = msg.info;
        sendRobotData();
        // return mapMetaData;
      }
    );
    //PathShape
    const subPathShape = singletonNode.createSubscription(
      process.env.ROS2_pathShapeTopicType,
      process.env.ROS2_pathShapeTopicName,
      (msg) => {
        // console.log('pathShape');

        // singletonNode.destroySubscription(sub);
        pathShape = msg;
        sendRobotData();
        // return pathShape;
      }
    );
    //Battery
    const subBattery = singletonNode.createSubscription(
      // 'std_msgs/msg/String',
      // '/my_topic',
      process.env.ROS2_batteryStatusTopicType,
      process.env.ROS2_batteryStatusTopicName,
      (msg) => {
        // singletonNode.destroySubscription(sub);
        // console.log(msg);
        batteryData.batteryPercentage = msg.socpercentage;
        batteryData.batteryStatus = msg.battery_status;
        sendRobotData();
      }
    );
  })
  .catch((err) => {
    console.log(err);
  });

// Set up WebSocket server and connection listener
wss.wss.on('connection', (socket) => {
  console.log('Client connected.');

  // Listen for incoming messages from clients
  socket.on('message', (message) => {
    try {
      const parsedMessage = JSON.parse(message);
      // console.log('Received message:', parsedMessage);

      // Process the received message here, e.g., broadcast to other clients, store in a database, etc.
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });

  // Send the initial robotPose data to the newly connected client
  const robotData = {
    robotPose,
    traceShape,
    base64Map,
    pathShape,
    mapMetaData,
    batteryData,
    robotConnection,
  };
  socket.send(JSON.stringify(robotData));

  // Handle disconnection
  socket.on('close', () => {
    console.log('Client disconnected.');
  });
});

exports.liveData = () => {
  const robotData = {
    robotPose,
    traceShape,
    base64Map,
    pathShape,
    mapMetaData,
    batteryData,
    robotConnection,
  };
  return robotData;
};

const checkRobotConnection = async () => {
  try {
    const output = spawnSync('ros2', ['node', 'list']);
    const nodes = output.stdout.toString().split('\n');
    // console.log('all nodes', nodes);
    const targetNode = nodes.filter((node) => node.startsWith('/rclnodejs'));
    if (targetNode.length) {
      robotConnection = true;
      return robotConnection;
    } else {
      robotConnection = false;
      return robotConnection;
    }
  } catch (error) {
    console.log(error);
  }
};
checkRobotConnection();
