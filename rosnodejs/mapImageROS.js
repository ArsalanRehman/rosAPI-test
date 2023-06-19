const rosnodejs = require('rosnodejs');
const Jimp = require('jimp');

rosnodejs.initNode('/testNOde').then(() => {
  const nh = rosnodejs.nh;
  const sub = nh.subscribe('/map', 'nav_msgs/OccupancyGrid', (msg) => {
    sub.unsubscribe();
    const width = msg.info.width;
    const height = msg.info.height;
    const image = new Jimp(width, height);
    var invertedValue = null;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = y * width + x;
        const value = msg.data[index];
        if (value === 0) {
          invertedValue = 255;
        } else {
          invertedValue = 0;
        }

        image.setPixelColor(
          Jimp.rgbaToInt(invertedValue, invertedValue, invertedValue, 255),
          x,
          y
        );
      }
    }

    image.rotate(180);
    image.mirror(true, false);
    // const now = new Date();
    // const year = now.getFullYear();
    // const month = now.getMonth() + 1;
    // const day = now.getDate();
    // const hours = now.getHours();
    // const minutes = now.getMinutes();
    // const seconds = now.getSeconds();

    // const fileName =
    //   `${day}-${month}-${year}|${hours}:${minutes}:${seconds}` + '.jpg';
    // crypto.randomBytes(8).toString('hex') + '.jpg';
    // if ('images/map.jpg') {
    //   console.log('image exists');
    // }
    image.write(`images/map.jpg`);
    return 0;
  });
});

// return msg;

//   console.log('Message', msg1);
// Create an array of pixel data with dimensions 100x100
//   const pixelData = new Uint8ClampedArray(99 * 99 * 4);

// Load the pixel data into a new Jimp image
//   const image = new Jimp({
//     data: imageData,
//     width: 400,
//     height: 400,
//   });

//   // Save the image to a file
//   image.write('images/im.png', (err) => {
//     if (err) throw err;
//     console.log('Image saved!');
//   });

// const data = msg.toImage();
// console.log(data);
// fs.writeFile('map.png', data, (err) => {
//   if (err) throw err;
//   console.log('file has been saved');
// });

//-------------------------------Data From ROS-------------------------------
// map_load_time:
//   secs: 1671084568
//   nsecs:  60695428
// resolution: 0.05000000074505806
// width: 400
// height: 400
// origin:
//   position:
//     x: -10.0
//     y: -10.0
//     z: 0.0
//   orientation:
//     x: 0.0
//     y: 0.0
//     z: 0.0
//     w: 1.0
