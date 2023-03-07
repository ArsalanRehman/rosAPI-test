const rosnodejs = require('rosnodejs');
rosnodejs.initNode('/testNOde').then(() => {
  const nh = rosnodejs.nh;

  rosnodejs.shutdown();
  console.log('dsfsd');
});
