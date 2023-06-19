exports.listenCommand = (req, res) => {
  console.log('My values');
  console.log(req.body.param);
  console.log(req.body.val);
  const { stringify } = require('querystring');

  rosnodejs
    .initNode(process.env.ROSNODE)
    .then(() => {
      const nh = rosnodejs.nh;
      const arslan = nh.setParam(String(req.body.param), req.body.val);
      arslan.then((result) => {
        console.log(result);
      });
      /////Subscriber and publisher//////////////
      const sub = nh.subscribe('/arslanTopic', 'std_msgs/String', (msg) => {
        console.log('Got msg on chatter: %j', msg);
      });

      const pub = nh.advertise('/arslanTopic', 'std_msgs/String');
      pub.publish(String(req.body.msg));

      res.status(200).json({
        status: 'success',
        data: {
          arslan: req.body,
        },
      });
    })
    .catch((err) => {
      rosnodejs.log.error(err.stack);
    });
};
