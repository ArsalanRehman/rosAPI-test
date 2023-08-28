// const Jimp = require('jimp');

// Jimp.read('./images/map.jpg').then((image) => {
//   image.quality(60).greyscale().write('./images/image.pgm');
// });

/////////////////////////////////////////////////////////////////////////////
// const fs = require('fs');
// const Jimp = require('jimp');
// const inputPath = './images/map.jpg';
// const outputPath = './images/newMap.pgm';
// async function savePGM(inputPath, outputPath) {
//   const image = await Jimp.read(inputPath);

//   const width = image.bitmap.width;
//   const height = image.bitmap.height;

//   let data = 'P2\n';
//   data += `${width} ${height}\n`;
//   data += '255\n';

//   for (let y = 0; y < height; y++) {
//     for (let x = 0; x < width; x++) {
//       const color = Jimp.intToRGBA(image.getPixelColor(x, y));
//       const intensity = Math.round(
//         0.2989 * color.r + 0.587 * color.g + 0.114 * color.b
//       );
//       data += `${intensity} `;
//     }
//     data += '\n';
//   }

//   fs.writeFileSync(outputPath, data);
// }

// savePGM('./images/map.jpg', './images/newMap.pgm');

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const fs = require('fs');

// Read the file
// fs.readFile(
//   '/home/kali/catkin_ws/src/mir_robot/mir_gazebo/maps/my_map.yaml',
//   'utf8',
//   (err, data) => {
//     if (err) throw err;

//     // Replace the text
//     let newData = data.replace(
//       '/home/kali/catkin_ws/src/mir_robot/mir_gazebo/maps/my_map.pgm',
//       '/home/kali/catkin_ws/src/mir_robot/mir_gazebo/maps/map.pgm'
//     );

//     // Write the file
//     fs.writeFile(
//       '/home/kali/catkin_ws/src/mir_robot/mir_gazebo/maps/my_map.yaml',

//       newData,
//       (err) => {
//         if (err) throw err;
//         console.log('File updated');
//       }
//     );
//   }
// );
/////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////
//Rotate Image from backend

// const Jimp = require('jimp');

// // Load the image
// Jimp.read('images/map.jpg')
//   .then((image) => {
//     let degreesToRotate = 90;

//     // Convert negative degrees to positive
//     while (degreesToRotate < 0) {
//       degreesToRotate += 360;
//     }

//     // Rotate the image
//     image.rotate(degreesToRotate);

//     // Save the rotated image
//     return image.writeAsync('images/map.jpg');
//   })
//   .catch((error) => {
//     console.error(error);
//   });

const sharp = require('sharp');
const fs = require('fs');

// Read the PNG image from file
sharp('images/convertedImage.png')
  .grayscale()
  .raw()
  .toBuffer((err, data, info) => {
    if (err) throw err;

    // Create a new PGM image with the same dimensions
    const pgm = `P5\n${info.width} ${info.height}\n255\n`;

    // Write the PGM image to file
    const stream = fs.createWriteStream('images/my_map.pgm');
    stream.write(pgm);
    stream.write(data);
    stream.end();
  });
/*
Node name: gazebo
Node namespace: /
Topic type: rosgraph_msgs/msg/Clock
Endpoint type: PUBLISHER
GID: 01.0f.d2.4e.e6.a8.7f.53.01.00.00.00.00.00.12.03.00.00.00.00.00.00.00.00
QoS profile:
  Reliability: BEST_EFFORT
  History (Depth): UNKNOWN
  Durability: VOLATILE
  Lifespan: Infinite
  Deadline: Infinite
  Liveliness: AUTOMATIC
  Liveliness lease duration: Infinite

Subscription count: 25

Node name: rviz2
Node namespace: /
Topic type: rosgraph_msgs/msg/Clock
Endpoint type: SUBSCRIPTION
GID: 01.0f.d2.4e.09.a9.28.1b.01.00.00.00.00.00.11.04.00.00.00.00.00.00.00.00
QoS profile:
  Reliability: BEST_EFFORT
  History (Depth): UNKNOWN
  Durability: VOLATILE
  Lifespan: Infinite
  Deadline: Infinite
  Liveliness: AUTOMATIC
  Liveliness lease duration: Infinite

Node name: transform_listener_impl_56151dfc5050
Node namespace: /
Topic type: rosgraph_msgs/msg/Clock
Endpoint type: SUBSCRIPTION
GID: 01.0f.d2.4e.09.a9.28.1b.01.00.00.00.00.00.34.04.00.00.00.00.00.00.00.00
QoS profile:
  Reliability: BEST_EFFORT
  History (Depth): UNKNOWN
  Durability: VOLATILE
  Lifespan: Infinite
  Deadline: Infinite
  Liveliness: AUTOMATIC
  Liveliness lease duration: Infinite

Node name: ekf_filter_node
Node namespace: /
Topic type: rosgraph_msgs/msg/Clock
Endpoint type: SUBSCRIPTION
GID: 01.0f.d2.4e.2b.a9.5b.ba.01.00.00.00.00.00.11.04.00.00.00.00.00.00.00.00
QoS profile:
  Reliability: BEST_EFFORT
  History (Depth): UNKNOWN
  Durability: VOLATILE
  Lifespan: Infinite
  Deadline: Infinite
  Liveliness: AUTOMATIC
  Liveliness lease duration: Infinite

Node name: transform_listener_impl_55ac9803ff90
Node namespace: /
Topic type: rosgraph_msgs/msg/Clock
Endpoint type: SUBSCRIPTION
GID: 01.0f.d2.4e.2b.a9.5b.ba.01.00.00.00.00.00.14.04.00.00.00.00.00.00.00.00
QoS profile:
  Reliability: BEST_EFFORT
  History (Depth): UNKNOWN
  Durability: VOLATILE
  Lifespan: Infinite
  Deadline: Infinite
  Liveliness: AUTOMATIC
  Liveliness lease duration: Infinite

Node name: amcl
Node namespace: /
Topic type: rosgraph_msgs/msg/Clock
Endpoint type: SUBSCRIPTION
GID: 01.0f.d2.4e.3e.a9.fb.c5.01.00.00.00.00.00.11.04.00.00.00.00.00.00.00.00
QoS profile:
  Reliability: BEST_EFFORT
  History (Depth): UNKNOWN
  Durability: VOLATILE
  Lifespan: Infinite
  Deadline: Infinite
  Liveliness: AUTOMATIC
  Liveliness lease duration: Infinite

Node name: transform_listener_impl_561d01662120
Node namespace: /
Topic type: rosgraph_msgs/msg/Clock
Endpoint type: SUBSCRIPTION
GID: 01.0f.d2.4e.3e.a9.fb.c5.01.00.00.00.00.00.1f.04.00.00.00.00.00.00.00.00
QoS profile:
  Reliability: BEST_EFFORT
  History (Depth): UNKNOWN
  Durability: VOLATILE
  Lifespan: Infinite
  Deadline: Infinite
  Liveliness: AUTOMATIC
  Liveliness lease duration: Infinite

Node name: map_server
Node namespace: /
Topic type: rosgraph_msgs/msg/Clock
Endpoint type: SUBSCRIPTION
GID: 01.0f.d2.4e.45.a9.30.3e.01.00.00.00.00.00.11.04.00.00.00.00.00.00.00.00
QoS profile:
  Reliability: BEST_EFFORT
  History (Depth): UNKNOWN
  Durability: VOLATILE
  Lifespan: Infinite
  Deadline: Infinite
  Liveliness: AUTOMATIC
  Liveliness lease duration: Infinite

Node name: lifecycle_manager_localization
Node namespace: /
Topic type: rosgraph_msgs/msg/Clock
Endpoint type: SUBSCRIPTION
GID: 01.0f.d2.4e.50.a9.28.01.01.00.00.00.00.00.11.04.00.00.00.00.00.00.00.00
QoS profile:
  Reliability: BEST_EFFORT
  History (Depth): UNKNOWN
  Durability: VOLATILE
  Lifespan: Infinite
  Deadline: Infinite
  Liveliness: AUTOMATIC
  Liveliness lease duration: Infinite

Node name: slam_toolbox
Node namespace: /
Topic type: rosgraph_msgs/msg/Clock
Endpoint type: SUBSCRIPTION
GID: 01.0f.d2.4e.5d.a9.dc.90.02.00.00.00.00.00.11.04.00.00.00.00.00.00.00.00
QoS profile:
  Reliability: BEST_EFFORT
  History (Depth): UNKNOWN
  Durability: VOLATILE
  Lifespan: Infinite
  Deadline: Infinite
  Liveliness: AUTOMATIC
  Liveliness lease duration: Infinite

Node name: liveMap
Node namespace: /
Topic type: rosgraph_msgs/msg/Clock
Endpoint type: SUBSCRIPTION
GID: 01.0f.d2.4e.61.a9.dc.5f.01.00.00.00.00.00.05.04.00.00.00.00.00.00.00.00
QoS profile:
  Reliability: BEST_EFFORT
  History (Depth): UNKNOWN
  Durability: VOLATILE
  Lifespan: Infinite
  Deadline: Infinite
  Liveliness: AUTOMATIC
  Liveliness lease duration: Infinite

Node name: lifecycle_manager_mapping
Node namespace: /
Topic type: rosgraph_msgs/msg/Clock
Endpoint type: SUBSCRIPTION
GID: 01.0f.d2.4e.6b.a9.97.1f.01.00.00.00.00.00.11.04.00.00.00.00.00.00.00.00
QoS profile:
  Reliability: BEST_EFFORT
  History (Depth): UNKNOWN
  Durability: VOLATILE
  Lifespan: Infinite
  Deadline: Infinite
  Liveliness: AUTOMATIC
  Liveliness lease duration: Infinite

Node name: twist_mux
Node namespace: /
Topic type: rosgraph_msgs/msg/Clock
Endpoint type: SUBSCRIPTION
GID: 01.0f.d2.4e.6d.a9.be.aa.01.00.00.00.00.00.11.04.00.00.00.00.00.00.00.00
QoS profile:
  Reliability: BEST_EFFORT
  History (Depth): UNKNOWN
  Durability: VOLATILE
  Lifespan: Infinite
  Deadline: Infinite
  Liveliness: AUTOMATIC
  Liveliness lease duration: Infinite

Node name: controller_server
Node namespace: /
Topic type: rosgraph_msgs/msg/Clock
Endpoint type: SUBSCRIPTION
GID: 01.0f.d2.4e.d4.a8.14.8b.01.00.00.00.00.00.11.04.00.00.00.00.00.00.00.00
QoS profile:
  Reliability: BEST_EFFORT
  History (Depth): UNKNOWN
  Durability: VOLATILE
  Lifespan: Infinite
  Deadline: Infinite
  Liveliness: AUTOMATIC
  Liveliness lease duration: Infinite

Node name: local_costmap
Node namespace: /local_costmap
Topic type: rosgraph_msgs/msg/Clock
Endpoint type: SUBSCRIPTION
GID: 01.0f.d2.4e.d4.a8.14.8b.01.00.00.00.00.00.2c.04.00.00.00.00.00.00.00.00
QoS profile:
  Reliability: BEST_EFFORT
  History (Depth): UNKNOWN
  Durability: VOLATILE
  Lifespan: Infinite
  Deadline: Infinite
  Liveliness: AUTOMATIC
  Liveliness lease duration: Infinite

Node name: planner_server
Node namespace: /
Topic type: rosgraph_msgs/msg/Clock
Endpoint type: SUBSCRIPTION
GID: 01.0f.d2.4e.d6.a8.a0.8e.01.00.00.00.00.00.11.04.00.00.00.00.00.00.00.00
QoS profile:
  Reliability: BEST_EFFORT
  History (Depth): UNKNOWN
  Durability: VOLATILE
  Lifespan: Infinite
  Deadline: Infinite
  Liveliness: AUTOMATIC
  Liveliness lease duration: Infinite

Node name: global_costmap
Node namespace: /global_costmap
Topic type: rosgraph_msgs/msg/Clock
Endpoint type: SUBSCRIPTION
GID: 01.0f.d2.4e.d6.a8.a0.8e.01.00.00.00.00.00.2c.04.00.00.00.00.00.00.00.00
QoS profile:
  Reliability: BEST_EFFORT
  History (Depth): UNKNOWN
  Durability: VOLATILE
  Lifespan: Infinite
  Deadline: Infinite
  Liveliness: AUTOMATIC
  Liveliness lease duration: Infinite

Node name: bt_navigator
Node namespace: /
Topic type: rosgraph_msgs/msg/Clock
Endpoint type: SUBSCRIPTION
GID: 01.0f.d2.4e.da.a8.a1.62.01.00.00.00.00.00.11.04.00.00.00.00.00.00.00.00
QoS profile:
  Reliability: BEST_EFFORT
  History (Depth): UNKNOWN
  Durability: VOLATILE
  Lifespan: Infinite
  Deadline: Infinite
  Liveliness: AUTOMATIC
  Liveliness lease duration: Infinite

Node name: lifecycle_manager_navigation
Node namespace: /
Topic type: rosgraph_msgs/msg/Clock
Endpoint type: SUBSCRIPTION
GID: 01.0f.d2.4e.de.a8.45.01.01.00.00.00.00.00.11.04.00.00.00.00.00.00.00.00
QoS profile:
  Reliability: BEST_EFFORT
  History (Depth): UNKNOWN
  Durability: VOLATILE
  Lifespan: Infinite
  Deadline: Infinite
  Liveliness: AUTOMATIC
  Liveliness lease duration: Infinite

Node name: joint_state_publisher
Node namespace: /
Topic type: rosgraph_msgs/msg/Clock
Endpoint type: SUBSCRIPTION
GID: 01.0f.d2.4e.e2.a8.16.32.01.00.00.00.00.00.05.04.00.00.00.00.00.00.00.00
QoS profile:
  Reliability: BEST_EFFORT
  History (Depth): UNKNOWN
  Durability: VOLATILE
  Lifespan: Infinite
  Deadline: Infinite
  Liveliness: AUTOMATIC
  Liveliness lease duration: Infinite

Node name: robot_state_publisher
Node namespace: /
Topic type: rosgraph_msgs/msg/Clock
Endpoint type: SUBSCRIPTION
GID: 01.0f.d2.4e.e4.a8.2d.21.01.00.00.00.00.00.11.04.00.00.00.00.00.00.00.00
QoS profile:
  Reliability: BEST_EFFORT
  History (Depth): UNKNOWN
  Durability: VOLATILE
  Lifespan: Infinite
  Deadline: Infinite
  Liveliness: AUTOMATIC
  Liveliness lease duration: Infinite

Node name: gazebo
Node namespace: /
Topic type: rosgraph_msgs/msg/Clock
Endpoint type: SUBSCRIPTION
GID: 01.0f.d2.4e.e6.a8.7f.53.01.00.00.00.00.00.14.04.00.00.00.00.00.00.00.00
QoS profile:
  Reliability: BEST_EFFORT
  History (Depth): UNKNOWN
  Durability: VOLATILE
  Lifespan: Infinite
  Deadline: Infinite
  Liveliness: AUTOMATIC
  Liveliness lease duration: Infinite

Node name: gazebo_ros_state
Node namespace: /gazebo
Topic type: rosgraph_msgs/msg/Clock
Endpoint type: SUBSCRIPTION
GID: 01.0f.d2.4e.e6.a8.7f.53.01.00.00.00.00.00.3c.04.00.00.00.00.00.00.00.00
QoS profile:
  Reliability: BEST_EFFORT
  History (Depth): UNKNOWN
  Durability: VOLATILE
  Lifespan: Infinite
  Deadline: Infinite
  Liveliness: AUTOMATIC
  Liveliness lease duration: Infinite

Node name: turtlebot3_laserscan
Node namespace: /
Topic type: rosgraph_msgs/msg/Clock
Endpoint type: SUBSCRIPTION
GID: 01.0f.d2.4e.e6.a8.7f.53.01.00.00.00.00.00.51.04.00.00.00.00.00.00.00.00
QoS profile:
  Reliability: BEST_EFFORT
  History (Depth): UNKNOWN
  Durability: VOLATILE
  Lifespan: Infinite
  Deadline: Infinite
  Liveliness: AUTOMATIC
  Liveliness lease duration: Infinite

Node name: turtlebot3_diff_drive
Node namespace: /
Topic type: rosgraph_msgs/msg/Clock
Endpoint type: SUBSCRIPTION
GID: 01.0f.d2.4e.e6.a8.7f.53.01.00.00.00.00.00.61.04.00.00.00.00.00.00.00.00
QoS profile:
  Reliability: BEST_EFFORT
  History (Depth): UNKNOWN
  Durability: VOLATILE
  Lifespan: Infinite
  Deadline: Infinite
  Liveliness: AUTOMATIC
  Liveliness lease duration: Infinite

Node name: turtlebot3_joint_state
Node namespace: /
Topic type: rosgraph_msgs/msg/Clock
Endpoint type: SUBSCRIPTION
GID: 01.0f.d2.4e.e6.a8.7f.53.01.00.00.00.00.00.74.04.00.00.00.00.00.00.00.00
QoS profile:
  Reliability: BEST_EFFORT
  History (Depth): UNKNOWN
  Durability: VOLATILE
  Lifespan: Infinite
  Deadline: Infinite
  Liveliness: AUTOMATIC
  Liveliness lease duration: Infinite

*/ 