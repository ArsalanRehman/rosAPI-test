function eulerToQuaternion(euler) {
    // Convert Euler angles to radians
    var x = euler.x * Math.PI / 180;
    var y = euler.y * Math.PI / 180;
    var z = euler.z * Math.PI / 180;

    // Calculate quaternion
    var c1 = Math.cos(z / 2);
    var c2 = Math.cos(y / 2);
    var c3 = Math.cos(x / 2);
    var s1 = Math.sin(z / 2);
    var s2 = Math.sin(y / 2);
    var s3 = Math.sin(x / 2);

    var quaternion = {
        w: c1 * c2 * c3 - s1 * s2 * s3,
        x: s1 * s2 * c3 + c1 * c2 * s3,
        y: c1 * s2 * c3 - s1 * c2 * s3,
        z: s1 * c2 * c3 + c1 * s2 * s3
    };

    return quaternion;
}
var euler = { x: 0, y: 0, z: 180 };
var quaternion = eulerToQuaternion(euler);
// var fixedQuaternion = quaternion.toFixed(2);
console.log('Euler To QTE', quaternion);


// function eulerToQuaternion(x, y, z) {
//     // Convert Euler angles to radians if they are not in radians
//     x = x * Math.PI / 180;
//     y = y * Math.PI / 180;
//     z = z * Math.PI / 180;
  
//     // Calculate the quaternion from Euler angles
//     var qx = Math.sin(x / 2) * Math.cos(y / 2) * Math.cos(z / 2) - Math.cos(x / 2) * Math.sin(y / 2) * Math.sin(z / 2);
//     var qy = Math.cos(x / 2) * Math.sin(y / 2) * Math.cos(z / 2) + Math.sin(x / 2) * Math.cos(y / 2) * Math.sin(z / 2);
//     var qz = Math.cos(x / 2) * Math.cos(y / 2) * Math.sin(z / 2) - Math.sin(x / 2) * Math.sin(y / 2) * Math.cos(z / 2);
//     var qw = Math.cos(x / 2) * Math.cos(y / 2) * Math.cos(z / 2) + Math.sin(x / 2) * Math.sin(y / 2) * Math.sin(z / 2);
  
//     // Return the quaternion as an array [qx, qy, qz, qw]
//     return [qx, qy, qz, qw];
//   }

  

// const result =  eulerToQuaternion(0,0,180);
// console.log(result);










// function quaternionToEuler(x, y, z, w) {
//     const roll = Math.atan2(2 * (w * x + y * z), 1 - 2 * (x * x + y * y));
//     const pitch = Math.asin(2 * (w * y - z * x));
//     const yaw = Math.atan2(2 * (w * z + x * y), 1 - 2 * (y * y + z * z));

//     return [roll, pitch, yaw];
// }
// const qte = [0.122, 0.112, 0.167, 0.971];
// const eu = quaternionToEuler(...qte);

// console.log('QTE to Euler', eu); // [0.445536, 0.633232, 0.555006]
