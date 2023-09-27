const rosnodejs = require('rosnodejs');

async function getDataFromMapTopic() {
  try {
    await rosnodejs.initNode('ros2test');
    const nh = rosnodejs.nh;
    const sub = nh.subscribe('/map', 'nav_msgs/OccupancyGrid', async (msg) => {
      console.log(msg);
    });
  } catch (err) {
    console.log(err);
  }
}
getDataFromMapTopic();
