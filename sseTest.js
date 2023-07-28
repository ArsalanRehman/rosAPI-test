// const express = require('express');
// const cors = require('cors');
// const app = express();
// const port = 3030;
// const rosUtil = require('./rclnodejs/ros_util');

// let dataFromROS = null; // Variable to keep track of the last sent data

// const corsOptions = {
//   origin: [
//     'http://localhost:3000',
//     'http://localhost',
//     'http://192.168.3.67',
//     'http://localhost:3001',
//     'http://localhost:3002',
//     'http://localhost:3003',
//     'http://localhost:3004',
//   ],
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

// app.use(cors(corsOptions));

// // Set up ROS node and subscription
// rosUtil.init_ros().then(() => {
//   const rclnodejs = rosUtil.get_rclnodejs();
//   const node = new rclnodejs.Node('testNodeSSE');
//   const sub = node.createSubscription(
//     'std_msgs/msg/String',
//     '/my_topic',
//     (msg) => {
//       //   node.destroySubscription(sub);
//       //   console.log('hello');

//       // Check for data changes every 5 seconds
//       dataFromROS = msg.data;
//       console.log('data from topic', msg.data);
//     }
//   );
//   node.spin();
// });

// // SSE endpoint
// app.get('/sse', (req, res) => {
//   // Set headers for SSE
//   res.set({
//     'Content-Type': 'text/event-stream',
//     'Cache-Control': 'no-cache',
//     Connection: 'keep-alive',
//   });

//   // Send initial SSE message with the current data
//   setInterval(() => {
//     res.write(`data: ${dataFromROS}\n\n`);
//   }, 1000);

//   // Clean up the SSE connection
//   req.on('close', () => {
//     console.log('connection closed');
//     // clearInterval(intervalId);
//     // Clean up ROS resources when SSE connection is closed
//   });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

// const express = require('express');
// const cors = require('cors');

// const app = express();
// const port = 3030;
// const rosUtil = require('./rclnodejs/ros_util');

// let lastSentData = null; // Variable to keep track of the last sent data

// // Function to simulate your data source
// function getData() {
//   // Replace this with your actual data retrieval logic
//   // For example, you could fetch data from a database, external API, etc.
//   return new Date().toISOString();
// }
// const corsOptions = {
//   origin: [
//     'http://localhost:3000',
//     'http://localhost',
//     'http://192.168.3.67',
//     'http://localhost:3001',
//     'http://localhost:3002',
//     'http://localhost:3003',
//     'http://localhost:3004',
//   ],
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

// app.use(cors(corsOptions));
// // SSE endpoint
// app.get('/sse', (req, res) => {
//   // Set headers for SSE
//   res.set({
//     'Content-Type': 'text/event-stream',
//     'Cache-Control': 'no-cache',
//     Connection: 'keep-alive',
//   });

//   rosUtil
//     .init_ros()
//     .then(() => {
//       const rclnodejs = rosUtil.get_rclnodejs();
//       const node = new rclnodejs.Node('testNodeSSE');
//       const sub = node.createSubscription(
//         'std_msgs/msg/String',
//         '/my_topic',
//         (msg) => {
//           // Send initial SSE message with the current data
//           const initialData = msg;
//           res.write(`data: ${initialData}\n\n`);
//           lastSentData = initialData;

//           // Check for data changes every 5 seconds
//           const intervalId = setInterval(() => {
//             const currentData = msg;
//             if (currentData !== lastSentData) {
//               res.write(`data: ${currentData}\n\n`);
//               lastSentData = currentData;
//             }
//           }, 5000);

//           // Close the connection if the client disconnects
//           req.on('close', () => {
//             clearInterval(intervalId);
//           });
//         }
//       );
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

// const express = require('express');
// const cors = require('cors');
// const app = express();
// const port = 3030;
// const rosUtil = require('./rclnodejs/ros_util');

// let lastSentData = null; // Variable to keep track of the last sent data

// const corsOptions = {
//   origin: [
//     'http://localhost:3000',
//     'http://localhost',
//     'http://192.168.3.67',
//     'http://localhost:3001',
//     'http://localhost:3002',
//     'http://localhost:3003',
//     'http://localhost:3004',
//   ],
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

// app.use(cors(corsOptions));

// // Set up ROS node and subscription
// rosUtil.init_ros().then(() => {
//   const rclnodejs = rosUtil.get_rclnodejs();
//   const node = new rclnodejs.Node('testNodeSSE');
//   const sub = node.createSubscription(
//     'std_msgs/msg/String',
//     '/my_topic',
//     (msg) => {
//       //   node.destroySubscription(sub);
//       //   console.log('hello');

//       // Check for data changes every 5 seconds
//       const currentData = msg.data;
//       console.log('data from topic', msg.data);
//       if (currentData !== lastSentData) {
//         lastSentData = currentData;
//       }
//     }
//   );
//   node.spin();
// });

// // SSE endpoint
// app.get('/sse', (req, res) => {
//   // Set headers for SSE
//   res.set({
//     'Content-Type': 'text/event-stream',
//     'Cache-Control': 'no-cache',
//     Connection: 'keep-alive',
//   });

//   // Send initial SSE message with the current data
//   const initialData = lastSentData;
//   console.log('initial data', initialData);
//   res.write(`data: ${initialData}\n\n`);
//   console.log('initial data', initialData);
//   lastSentData = initialData;

//   // Check for data changes every 5 seconds
//   const intervalId = setInterval(() => {
//     const currentData = lastSentData;
//     if (currentData !== lastSentData) {
//       res.write(`data: ${currentData}\n\n`);
//       console.log('currnet Data', currentData);

//       lastSentData = currentData;
//     }
//   }, 5000);

//   // Clean up the SSE connection
//   req.on('close', () => {
//     clearInterval(intervalId);
//     // Clean up ROS resources when SSE connection is closed
//   });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });







//////////////////////////////////////////////////////////////////////////////////////////////

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3030;
const rosUtil = require('./rclnodejs/ros_util');

let dataFromROS = null; // Variable to keep track of the last sent data

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost',
    'http://192.168.3.67',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'http://localhost:3004',
  ],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Set up ROS node and subscription
rosUtil.init_ros().then(() => {
  const rclnodejs = rosUtil.get_rclnodejs();
  const node = new rclnodejs.Node('testNodeSSE');
  const sub = node.createSubscription(
    'std_msgs/msg/String',
    '/my_topic',
    (msg) => {
      // Check if the data has changed
      if (msg.data !== dataFromROS) {
        dataFromROS = msg.data;
        console.log('data from topic', msg.data);
        // Send the updated data to all SSE clients
        sendSSEMessage(`data: ${dataFromROS}\n\n`);
      }
    }
  );
  node.spin();
});

// Helper function to send SSE messages to all connected clients
const sendSSEMessage = (message) => {
  connections.forEach((res) => {
    res.write(message);
  });
};

const connections = new Set();

// SSE endpoint
app.get('/sse', (req, res) => {
  // Set headers for SSE
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  // Add the response object to the connections set
  connections.add(res);

  // Send initial SSE message with the current data
  if (dataFromROS) {
    res.write(`data: ${dataFromROS}\n\n`);
  }

  // Clean up the SSE connection
  req.on('close', () => {
    console.log('connection closed');
    // Remove the response object from the connections set
    connections.delete(res);
    // Clean up ROS resources when SSE connection is closed (if needed)
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
