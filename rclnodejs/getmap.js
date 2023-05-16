const rclnodejs = require('rclnodejs');
const Jimp = require('jimp');
// const msg = rclnodejs.require('nav_msgs/msg/OccupancyGrid').msg;

async function run() {
  try {
    await rclnodejs.init();
    const node = rclnodejs.createNode('subscriber_node');
    const sub = node.createSubscription(
      'nav_msgs/msg/OccupancyGrid',
      '/map',
      (msg) => {
        // console.log(msg);
        map_width = msg.info.width;
        map_height = msg.info.height;
        console.log('width and height ', map_width, map_height);
        const image = new Jimp(map_width, map_height);
        for (let y = 0; y < map_height; y++) {
          for (let x = 0; x < map_width; x++) {
            const index = y * map_width + x;
            const value = msg.data[index];
            const invertedValue = value === 0 ? 255 : 0;
            image.setPixelColor(
              Jimp.rgbaToInt(invertedValue, invertedValue, invertedValue, 255),
              x,
              y
            );
          }
        }
        image.rotate(180);
        image.mirror(true, false);
        image.write(`images/rcl_map.jpg`);
        node.destroySubscription(sub);
      }
    );
    setTimeout(() => {
      console.log('Unsubscribing from the topic');
      node.destroySubscription(sub);
    }, 5000);
    rclnodejs.spin(node);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

run();
