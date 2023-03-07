// exports.saveMap = async (req, res, next) => {
//   rosnodejs
//     .initNode('/my_node')
//     .then(() => {
//       const nh = rosnodejs.nh;
//       const sub = nh.subscribe(
//         '/map',
//         'nav_msgs/OccupancyGrid',
//         async (msg) => {
//           const width = msg.info.width;
//           const height = msg.info.height;
//           const image = new Jimp(width, height);
//           var invertedValue = null;

//           for (let y = 0; y < height; y++) {
//             for (let x = 0; x < width; x++) {
//               const index = y * width + x;
//               const value = msg.data[index];
//               if (value === 0) {
//                 invertedValue = 255;
//               } else {
//                 invertedValue = 0;
//               }

//               image.setPixelColor(
//                 Jimp.rgbaToInt(
//                   invertedValue,
//                   invertedValue,
//                   invertedValue,
//                   255
//                 ),
//                 x,
//                 y
//               );
//             }
//           }
//           image.rotate(180);
//           image.mirror(true, false);
//           image.write(`images/map.jpg`);
//           nh.unsubscribe('/map');

//           //   rosnodejs.shutdown();
//           const ipAddress = ip.address();
//           var ImageURL = `${req.protocol}://${ipAddress}:5050/map.jpg`;
//           const newPicture = new imageModel({
//             path: 'images/map.jpg',
//             type: 'map',
//             Date: Date.now(),
//             link: ImageURL,
//           });
//           var object = {
//             Message: 'Image has been sent uploaded successfully',
//             link: ImageURL,
//           };
//           //   saveMapObject = object;
//           await newPicture
//             .save()
//             .then((doc) => {
//               console.log('doc saved successfully', doc);
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//           handleResponse(object);
//         }
//       );
//       function handleResponse(object) {
//         // console.log(object);
//         res.status(200).json({
//           object,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(200).json({
//         err,
//       });
//       console.log(err);
//     });
// };
