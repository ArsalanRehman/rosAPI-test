const rosnodejs = require('rosnodejs');
const PositionMarkerNavigateSrv = rosnodejs.require('mir_navigation').srv.PositionMarkerNavigate;

var request = new PositionMarkerNavigateSrv.Request();
request.goal = {
  position: {
    x: 12,
    y: 14,
    z: 5
  },
  orientation: {
    x: 0,
    y: 0,
    z: 0,
    w: 1
  }
};
// request.rotation = 120;
// request.marker_name = "Table 1";
console.log(request);

// rosnodejs.loadAllPackages();

rosnodejs.initNode('/add_position_marker_client')
  .then(() => {
    const nh = rosnodejs.nh;
    const client = nh.serviceClient('/PositionMarkerNavigate', 'mir_navigation/PositionMarkerNavigate');
    client.call(request);
  });

//rosservice call /add_position_marker


// var srv = new ROSLIB.Service({
//       ros: ros,
//       name: "/virtualmap",
//       serviceType: " virtualmap/Virtualmap",
//     });

//     var request = new ROSLIB.ServiceRequest({
//     point1:{x:points.children[1].x,y:points.children[1].y,z:0},
//     point2:{x:points.children[2].x,y:points.children[2].y,z:0},
//     });
//     srv.callService(request, function(result) {
//       console.log('Result for service call on ');
//     });

///////////////////////////////////////////////////////////////
// AddPositionMarkerRequest {
//   position: {
//     position: { x: 12, y: 14, z: 0 },
//     orientation: { x: 0, y: 0, z: 0, w: 1 }
//   },
//   rotation: 120,
//   marker_name: 'Table 1'
// }
// request.position = {
//   position: {
//     x: 12,
//     y: 14,
//     z: 0
//   },
//   orientation: {
//     x: 0,
//     y: 0,
//     z: 0,
//     w: 1
//   }
// };
// request.rotation = 120;
// request.marker_name = "Table 1";
///////////////////////////////////////////////////////////////
