////////////////////////////////////////// PUB AND SUB //////////////////////////////////////////

const rosnodejs = require('rosnodejs');
// rosnodejs.initNode('/ArslanNode').then(() => {
//   const nh = rosnodejs.nh;
//   const sub = nh.subscribe('/arslanTopic', 'std_msgs/String', (msg) => {
//     console.log('Got msg on chatter: %j', msg);
//   });

//   const pub = nh.advertise('/arslanTopic', 'std_msgs/String');
//   setTimeout(function () {
//     pub.publish({ data: 'test epik robotik' });
//   }, 1000);
// });

//answer by chatGPT start

// rosnodejs.initNode('/ArslanNode').then(() => {
//   const nh = rosnodejs.nh;
//   const sub = nh.subscribe('/arslanTopic', 'std_msgs/String', (msg) => {
//     console.log('Got msg on chatter: %j', msg);
//     var sentResponse = msg;
//     // pass sentResponse as an argument to the callback function
//     handleResponse(sentResponse);
//   });
// });

// // define the callback function
// function handleResponse(response) {
//   console.log(response);
// }
//answer by chatGPT END

//answer by chatGPT start

// const getResponse = () => {
//   return new Promise((resolve, reject) => {
//     const sub = nh.subscribe('/arslanTopic', 'std_msgs/String', (msg) => {
//       console.log('Got msg on chatter: %j', msg);
//       resolve(msg);
//     });
//   });
// };

// getResponse().then((response) => {
//   console.log(response);
// });

//answer by chatGPT END

// const rosnodejs = require('rosnodejs');
// rosnodejs.initNode('/arslanNode')

//         .then(() => {
//         const nh = rosnodejs.nh;
//         const pub = nh.advertise('/cmd_vel', 'geometry_msgs/Twist');
//         // while(true){
//         setTimeout(function () {
//             pub.publish({
//                 linear: {
//                     x: 80,
//                     y: 0,
//                     z: 0,
//                 },
//                 angular: {
//                     x: 0,
//                     y: 0,
//                     z: 80,
//                 }
//             }
//             );
//         }, 1000);
//     // }
//         // console.log(pub)
//     });

// const battery = (req, res) => {
//     rosnodejs.initNode('/my_node')
//         .then(() => {
//             const nh = rosnodejs.nh;
//             const sub = nh.subscribe('/battery', 'std_msgs/Int64', (battery) => {
//               console.log('Got msg on chatter: %j', battery);
//             });

//             const pub = nh.advertise('/battery', 'std_msgs/Int64');
//             pub.publish({ data: "100" });
//             // console.log(pub);

//         });
//     // console.log('Battery test');
// }
