// exports.liveMap = async (req, res) => {
//   try {
//     if (!isROSInitialized) {
//       await rclnodejs.init();
//       isROSInitialized = true;
//     }
//     const node = rclnodejs.createNode(process.env.RCLNODE);
//     const sub = node.createSubscription(
//       process.env.ROS2_mapTopicType,
//       process.env.ROS2_mapTopicName,
//       async (msg) => {
//         map_width = msg.info.width;
//         map_height = msg.info.height;
//         const image = new Jimp(map_width, map_height);
//         for (let y = 0; y < map_height; y++) {
//           for (let x = 0; x < map_width; x++) {
//             const index = y * map_width + x;
//             const value = msg.data[index];
//             const invertedValue = value === 0 ? 255 : 0;
//             image.setPixelColor(
//               Jimp.rgbaToInt(invertedValue, invertedValue, invertedValue, 255),
//               x,
//               y
//             );
//           }
//         }
//         image.rotate(180);
//         image.mirror(true, false);
//         node.destroySubscription(sub);
//         const ImageBase64 = await image.getBase64Async(Jimp.MIME_JPEG);

//         res.status(200).json({
//           success: true,
//           data: ImageBase64,
//         });
//       }
//     );
//     mapState = 'LiveMap';
//     rclnodejs.spin(node);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       error,
//     });
//   }
// };

const ros = require('./ros_util');

ros.init_ros();
const rclnodejs = ros.get_rclnodejs();
liveMap(rclnodejs);

function liveMap(rclnodejs) {
  const node = new rclnodejs.Node('rosTestAPI');
  const sub = node.createSubscription(
    'std_msgs/msg/String',
    'live_map',
    async (msg) => {
      console.log(msg);
    }
  );
  node.spin();
}
