const { spawn, spawnSync, exec } = require('child_process');
const Jimp = require('jimp');
const imageModel = require('../models/imageModel');
var ip = require('ip');
const util = require('util');
const fs = require('fs');
const helper = require('../utils/helperFunctions');
const { createCanvas, loadImage } = require('canvas');
const sizeOf = require('image-size');
const rosUtil = require('../utils/ros_util');
const singletonNode = require('../utils/rosNode');
const conversion = require('../utils/conversions');
const yaml = require('js-yaml');
const path = require('path');
const WebSocket = require('ws');
const { QoS } = require('rclnodejs');

// Global Varriable
var mapState = 'unactive';
var base64Map = null;
var robotPose = [];
var traceShape = [];
var mapMetaData = [];
var pathShape = [];

var qos = new QoS();
qos.durability = QoS.DurabilityPolicy.RMW_QOS_POLICY_DURABILITY_TRANSIENT_LOCAL;
qos.reliability = QoS.ReliabilityPolicy.RMW_QOS_POLICY_RELIABILITY_RELIABLE;

const writeFileAsync = util.promisify(fs.writeFile);

async function initialPoseFunction() {
  try {
    const yamlFilePath = path.join(process.env.ROS2_initialPose);
    // Read the YAML file
    const yamlData = fs.readFileSync(yamlFilePath, 'utf8');

    // Parse the YAML data
    const data = yaml.load(yamlData);

    // Access the individual values

    const initialPose = {
      initialPoseX: data.initial_pose_x,
      initialPoseY: data.initial_pose_y,
      initialPoseYaw: data.initial_pose_yaw,
      initialPoseZ: data.initial_pose_z,
    };
    return initialPose;
  } catch (error) {
    console.log(error);
  }
}
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

// const socket = new WebSocket('ws://127.0.0.1:8586');
const wss = new WebSocket.Server({ port: 8586 });

// console.log(socket);

//listening to the /robot_pose topic to get the live location of robot

rosUtil
  .init_ros()
  .then(async () => {
    if (robotPose.length < 1) {
      const initialPose = await initialPoseFunction();
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
    const sub = singletonNode.createSubscription(
      process.env.ROS2_robotPoseTopicType,
      process.env.ROS2_robotPoseTopicName,
      async (msg) => {
        const position = msg.pose.pose.position;
        const orientation = msg.pose.pose.orientation;
        const euler = conversion.quaternionToEuler(orientation);
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

        // Send the pose data via WebSocket to all connected clients
      }
    );
  })
  .catch((err) => {
    console.log(err);
  });

// Set up WebSocket server and connection listener
wss.on('connection', (socket) => {
  console.log('Client connected.');

  // Listen for incoming messages from clients
  socket.on('message', (message) => {
    try {
      const parsedMessage = JSON.parse(message);
      console.log('Received message:', parsedMessage);

      // Process the received message here, e.g., broadcast to other clients, store in a database, etc.
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });

  // Send the initial robotPose data to the newly connected client
  socket.send(JSON.stringify(robotPose));

  // Handle disconnection
  socket.on('close', () => {
    console.log('Client disconnected.');
  });
});

const robotData = {
  robotPose,
  traceShape,
  base64Map,
  pathShape,
};
const jsonData = JSON.stringify(robotData);
wss.clients.forEach((client) => {
  if (client.readyState === WebSocket.OPEN) {
    client.send(jsonData);
  }
});

function staticMap() {
  try {
    const output = spawnSync('ros2', ['node', 'list']);
    const nodes = output.stdout.toString().split('\n');
    // console.log(nodes);
    const nodesToKill = nodes.filter((node) => node.startsWith('/map_server'));
    console.log(nodesToKill);
    if (nodesToKill.length) {
      spawn('ros2', [
        'lifecycle',
        'set',
        '--no-daemon',
        ...nodesToKill,
        'deactivate',
      ]);
    } else {
      console.log('no nodes to kill');
    }
    spawn('ros2', [
      'launch',
      process.env.staticMapPackage,
      process.env.staticMapFile,
    ]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      error,
    });
  }
}
// staticMap();

async function runTerminalCommand(command) {
  await exec(command, (error, stdout, stderr) => {
    if (error) {
      const message = `Error executing the command: ${error}:`;
      console.log(message);
      return message;
    }
    // Output of the command
    console.log(`Command output:\n${stdout}`);
  });
}

async function runTerminalCommandAsync(command) {
  const result = spawnSync(command, { shell: true });

  if (result.error) {
    const message = `command: ${command} // Error executing the  ${result.error}`;
    console.log(message);
    throw new Error(message);
  }

  if (result.stderr.toString()) {
    const message = `Command: ${command}  Command error: ${result.stderr.toString()}`;
    console.log(message);
    throw new Error(message);
  }

  return result.stdout.toString();
}

const liveMapController = () => {
  rosUtil
    .init_ros()
    .then(async () => {
      // const node = new rclnodejs.Node('getPose');
      // console.log(node)
      const sub = singletonNode.createSubscription(
        process.env.ROS2_liveMapTopicType,
        process.env.ROS2_liveMapTopicName,
        (msg) => {
          // console.log(msg.data);
          singletonNode.destroySubscription(sub);
          base64Map = msg;
        }
      );
      return base64Map;
      // console.log(base64Map);
      // console.log(sub.isDestroyed());
      // node.spin();
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.liveMap = async (req, res) => {
  try {
    const newData = await liveMapController();
    // console.log(newData)
    res.status(200).json({
      success: true,
      message: 'live map sent successfully',
      data: base64Map,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'error while getting liveMap',
      error,
    });
  }
};

exports.getMapImage = async (req, res, next) => {
  try {
    const filePath = path.join(process.env.ROS2_MAP_DESTINATION, 'map.jpeg');
    const imageData = fs.readFileSync(filePath);
    const base64Image = imageData.toString('base64');
    // console.log(base64Image);
    res.status(200).json({
      success: true,
      message: 'image received successfully',
      base64: `data:image/jpeg;base64,${base64Image}`,
    });
    mapState = 'gettingMapImage';
  } catch (err) {
    res.status(500).json({ err });
    console.log(err);
  }
};

exports.getMapController = async () => {
  rosUtil
    .init_ros()
    .then(async () => {
      const sub = singletonNode.createSubscription(
        process.env.ROS2_mapTopicType,
        process.env.ROS2_mapTopicName,
        { qos: qos },
        async (msg) => {
          singletonNode.destroySubscription(sub);
          // console.log(msg);
          map_width = msg.info.width;
          map_height = msg.info.height;
          position = msg.info.origin;
          resolution = msg.info.resolution;
          // console.log(
          //   'width and height ',
          //   map_width,
          //   map_height,
          //   position,
          //   resolution
          // );

          const mapFilePath = path.join(
            process.env.ROS2_MAP_DESTINATION,
            'map.jpeg'
          );
          const image = new Jimp(map_width, map_height);
          for (let y = 0; y < map_height; y++) {
            for (let x = 0; x < map_width; x++) {
              const index = y * map_width + x;
              const value = msg.data[index];
              const invertedValue = value === 0 ? 255 : 0;
              image.setPixelColor(
                Jimp.rgbaToInt(
                  invertedValue,
                  invertedValue,
                  invertedValue,
                  255
                ),
                x,
                y
              );
            }
          }
          // image.rotate(180);
          // image.mirror(true, false);
          image.write(mapFilePath, (err) => {
            if (err) {
              console.log('Error writing map image:', err);
            } else {
              console.log('Map image saved at', mapFilePath);
            }
          });
        }
      );
      // node.spin();
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getMap = async (req, res) => {
  try {
    await this.getMapController();
    const ipAddress = ip.address();
    const imageURL = `${req.protocol}://${ipAddress}:5050/map.jpeg`;
    const imagePath = path.join(process.env.ROS2_MAP_DESTINATION, 'map.jpeg');
    const imageData = await fs.readFileSync(imagePath);
    const base64Image = imageData.toString('base64');
    // const dimensions = await sizeOf(imagePath);
    // const { width, height } = dimensions;

    // console.log(base64Image);
    // fs.writeFileSync('images/base64.txt', base64Image);
    const existingImage = await imageModel.findOne({
      link: imageURL,
    });
    if (existingImage) {
      console.log('Image URL already exists in the database');
      res.status(200).json({
        Message: 'Image URL already exists in the database',
        link: imageURL,
        base64: `data:image/jpeg;base64,${base64Image}`,
        // width: width,
        // height: height,
      });
      return;
    }
    // If the image URL does not exist in the database, save the new image
    const newPicture = new imageModel({
      path: 'images/map.jpeg',
      type: 'map',
      Date: Date.now(),
      link: imageURL,
    });
    await newPicture.save();
    //return the response
    res.status(200).json({
      Status: 'success',
      Message: 'Image has been sent uploaded successfully',
      // height: height,
      // width: width,
      link: imageURL,
      base64: `data:image/jpeg;base64,${base64Image}`,
    });
    mapState = 'gettingMap';
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'error while getting Map (endpoint:getMap)',
      error,
    });
    console.error(`Error: ${error}`);
  }
};

exports.startMap = async (req, res) => {
  try {
    const mappingNode = '/slam_toolbox';
    const output = spawnSync('ros2', ['node', 'list']);
    const nodes = output.stdout.toString().split('\n');
    // console.log(nodes);
    const nodesToKill = nodes.filter((node) => node.startsWith('/map_server'));
    const amclNode = nodes.filter((node) => node.startsWith('/amcl'));
    // kill the navigation (for later)
    const navNode = nodes.filter((node) => node.startsWith('/nav2'));

    console.log(nodesToKill);
    if (nodesToKill.length) {
      const killMapServerCommand = `ros2 lifecycle set ${nodesToKill} shutdown `;
      runTerminalCommand(killMapServerCommand);
    }
    if (amclNode.length) {
      const killAMCLcommand = `ros2 lifecycle set ${amclNode} deactivate `;
      runTerminalCommand(killAMCLcommand);
    }

    // start map
    const configureMapCommand = `ros2 lifecycle set ${mappingNode} configure `;
    const activateMapCommand = `ros2 lifecycle set ${mappingNode} activate `;
    await runTerminalCommandAsync(configureMapCommand);
    await runTerminalCommandAsync(activateMapCommand);

    res.status(200).json({
      success: true,
      message: 'map started successfully',
    });
    // runTerminalCommand(mappingNode, startAction);
    // console.log(`Started roslaunch with PID: ${child.pid}`);
    // latestValue = child;
    mapState = 'startingMap';
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'failed to start the map',
      error,
    });
  }
};

exports.stopMap = async (req, res) => {
  try {
    const node = '/slam_toolbox';
    const deactivateCommand = `ros2 lifecycle set ${node} deactivate `;
    console.log('deactivating');
    runTerminalCommandAsync(deactivateCommand);
    const cleanupCommand = `ros2 lifecycle set ${node} cleanup `;
    console.log('cleaning up');
    runTerminalCommandAsync(cleanupCommand);
    await helper.editYamlRos2('jpeg');
    // staticMap();
    res.status(200).json({
      success: true,
      Message: `node have been killed successfully `,
    });
    robotPose = [];
    traceShape = [];
    mapState = 'mapStoped';
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'error while stopping the map',
      error,
    });
  }
};

exports.saveMap = async (req, res) => {
  try {
    this.getMapController();
    const saveMapCommand = `ros2 launch ${process.env.saveMapPackage} ${process.env.saveMapFile}`;
    const output = await runTerminalCommand(saveMapCommand);
    console.log(output);
    res.status(200).json({
      success: true,
      message: 'map saved successfully',
      // data: stdout,
    });
    mapState = 'MapSaved';
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: `Error while saving map  ${error}`,
    });
  }
};

exports.pauseMap = async (req, res) => {
  rosUtil
    .init_ros()
    .then(async () => {
      // const rclnodejs = await rosUtil.get_rclnodejs();

      // const node = new rclnodejs.Node(process.env.ROS2_pauseMapNode);

      const client = singletonNode.createClient(
        process.env.ROS2_PauseMapSrvType,
        process.env.ROS2_PauseMapSrvName
      );

      const result = await client.waitForService(1000);
      if (!result) {
        console.log('Error: service not available');
        // await rclnodejs.shutdown();
        return;
      }

      // console.log(`Sending: ${typeof request}`, request);

      const response = await client.sendRequest({}, () => {
        console.log('Service triggered');
      });
      res.status(200).json({
        success: true,
        message: 'Service Triggered',
      });
      // console.log(`Result: ${typeof response}`, response);

      // await rclnodejs.shutdown();
    })
    .catch((err) => {
      res.status(500).json({ err });
      console.log('Error while calling the service: ', err);
    });
};

exports.downloadMap = (req, res) => {
  try {
    res.download('images/map.jpeg');
    mapState = 'MapDownloaded';
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};

exports.mapStatus = (req, res) => {
  try {
    res.status(200).json({
      mapState,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err,
    });
  }
};

exports.rotateMap = async (req, res) => {
  try {
    const base64Data = req.body.imageBase64.replace(
      /^data:image\/[a-z]+;base64,/,
      ''
    );
    var imageType = req.body.imageBase64.match(
      /^data:image\/([a-z]+);base64,/
    )[1];
    if (!imageType) {
      imageType = 'jpeg';
    }
    const filePath = path.join(
      process.env.ROS2_MAP_DESTINATION,
      `map.${imageType}`
    );

    // write the base64 data to the file path
    await writeFileAsync(filePath, base64Data, 'base64');

    // const Jimp = require('jimp');

    // Load the image
    Jimp.read(filePath)
      .then((image) => {
        let degreesToRotate = -Number(req.body.mapDegree);

        // Rotate the image
        image.rotate(degreesToRotate);
        // image.mirror(true, false);
        const mapFilePath = path.join(
          process.env.ROS2_MAP_DESTINATION,
          `map.${imageType}`
        );
        // Save the rotated image
        return image.writeAsync(mapFilePath);
      })
      .catch((error) => {
        console.error(error);
      });

    await helper.editYamlRos2(imageType);

    // setTimeout(async () => {
    //   transferMapToROS(imageType);
    // }, 1000);
    // send a success response
    res.status(200).send({
      success: true,
      message: 'Image rotated successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: 'failed to rotate map',
      err,
    });
  }
};

exports.cropMap = async (req, res) => {
  try {
    // getMap();
    const base64Data = req.body.imageBase64.replace(
      /^data:image\/[a-z]+;base64,/,
      ''
    );
    const mapWidth = req.body.width;
    const mapHeight = req.body.height;
    var imageType = req.body.imageBase64.match(
      /^data:image\/([a-z]+);base64,/
    )[1];
    if (!imageType) {
      imageType = 'jpeg';
    }
    const filePath = path.join(
      process.env.ROS2_MAP_DESTINATION,
      `map.${imageType}`
    );

    await writeFileAsync(filePath, base64Data, 'base64');

    //resize the image pixels

    // await Jimp.read(filePath)
    //   .then((inputImage) => {
    //     // Resize the image to fit within a 400x400 square using Jimp
    //     inputImage.cover(mapWidth, mapHeight);

    //     // Write the resized image to disk
    //     const mapFilePath = path.join(
    //       process.env.ROS2_MAP_DESTINATION,
    //       `map.${imageType}`
    //     );
    //     inputImage.write(mapFilePath);
    //     console.log(`Resized image saved to ${outputFilename}`);
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });

    await helper.editYamlRos2(imageType);
    res.status(200).send({ message: 'Image saved successfully' });
    // console.log('timer 1');
    // setTimeout(async () => {
    //   transferMapToROS(imageType);
    // }, 1000);
    // console.log('timer 2');

    mapState = 'Map Cropped';
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};

exports.drawPolygon = async (req, res) => {
  try {
    const filename = path.join(process.env.ROS2_MAP_DESTINATION, 'map.jpeg');
    const outputFilename = path.join(
      process.env.ROS2_MAP_DESTINATION,
      'map.jpeg'
    );
    // Read the file into a buffer
    const buffer = fs.readFileSync(filename);

    // Get the dimensions of the image from the buffer
    const { width, height } = sizeOf(buffer);
    const polygon = req.body.polygon;
    //this is how polygon array should look like

    // Define the coordinates of the polygon vertices
    // const polygon = [
    //   [100, -300],
    //   [300, -300],
    //   [300, -100],
    //   [100, -100],
    // ];
    console.log(`first ${polygon}`);
    for (let i = 0; i < polygon.length; i++) {
      const y = polygon[i][1]; // get the y-coordinate
      const newY = height - Math.abs(y); // calculate the new y-coordinate using the formula
      polygon[i][1] = newY; // update the y-coordinate of the polygon with the new value
    }
    console.log(`second ${polygon}`);

    // Load the image
    loadImage(filename)
      .then((image) => {
        // Create a canvas with the same dimensions as the image
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext('2d');

        // Draw the image on the canvas
        ctx.drawImage(image, 0, 0, image.width, image.height);

        // Draw the polygon on the canvas
        ctx.beginPath();
        ctx.moveTo(polygon[0][0], polygon[0][1]);
        for (let i = 1; i < polygon.length; i++) {
          ctx.lineTo(polygon[i][0], polygon[i][1]);
        }
        ctx.closePath();
        ctx.fillStyle = req.body.colorHex;
        ctx.fill();

        // Save the canvas to a file
        const out = fs.createWriteStream(outputFilename);
        const stream = canvas.createJPEGStream({ quality: 0.95 });
        stream.pipe(out);
        out.on('finish', () => console.log('Polygon drawn successfully'));
        res.status(200).json({
          message: 'Polygon drawn successfully',
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({
          err,
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err,
    });
  }
};

exports.robotPose = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      robotPose,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'error while getting robotPose',
      err,
    });
  }
};

const mapMetadataController = async () => {
  rosUtil
    .init_ros()
    .then(() => {
      const sub = singletonNode.createSubscription(
        process.env.ROS2_mapTopicType,
        process.env.ROS2_mapTopicName,
        { qos: qos },
        (msg) => {
          singletonNode.destroySubscription(sub);
          mapMetaData = msg.info;
        }
      );
      return mapMetaData;
    })
    .catch((error) => {
      console.log(error);
    });
};
mapMetadataController();

exports.mapMetadata = async (req, res) => {
  try {
    await mapMetadataController();
    res.status(200).json({
      success: true,
      message: 'mapMetadata taken successfully',
      mapMetaData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `failed to get mapMetaData from ${process.env.ROS2_mapMetaDataTopicName} `,
      error,
    });
  }
};

exports.initialPose = async (req, res) => {
  try {
    const yamlFilePath = path.join(process.env.ROS2_initialPose);
    // Read the YAML file
    const yamlData = fs.readFileSync(yamlFilePath, 'utf8');

    // Parse the YAML data
    const data = yaml.load(yamlData);

    // Access the individual values

    const initialPose = {
      initialPoseX: data.initial_pose_x,
      initialPoseY: data.initial_pose_y,
      initialPoseYaw: data.initial_pose_yaw,
      initialPoseZ: data.initial_pose_z,
    };
    // console.log(initialPose);
    res.status(200).json({
      success: true,
      message: 'initial Pose read successfully',
      data: initialPose,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'failed to get initial Pose ',
      error,
    });
  }
};

exports.navigationLock = (req, res) => {
  rosUtil
    .init_ros()
    .then(() => {
      const pub = singletonNode.createPublisher(
        process.env.ROS2_navigationLockTopicType,
        process.env.ROS2_navigationLockTopicName
      );
      const lock = req.body.lock;
      if (lock === 'true') {
        pub.publish(true);
      } else if (lock === 'false') {
        pub.publish(false);
      }
      singletonNode.destroyPublisher(pub);
      res.status(200).json({
        success: true,
        message: `navigationLock set to ${lock}`,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: 'error while locking navigation ',
        err,
      });
    });
};

exports.traceShapePose = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      traceShape,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'error while getting traceShape pose',
      err,
    });
  }
};

const pathShapeController = async () => {
  rosUtil
    .init_ros()
    .then(() => {
      const sub = singletonNode.createSubscription(
        process.env.ROS2_pathShapeTopicType,
        process.env.ROS2_pathShapeTopicName,
        (msg) => {
          singletonNode.destroySubscription(sub);
          pathShape = msg;
        }
      );
      return pathShape;
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.pathShape = async (req, res) => {
  try {
    const path = await pathShapeController();
    res.status(200).json({
      success: true,
      data: pathShape,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'failed to send pathShape',
      error,
    });
  }
};
