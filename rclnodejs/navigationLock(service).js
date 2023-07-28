exports.navigationLock = (req, res) => {
  rosUtil
    .init_ros()
    .then(() => {
      const client = singletonNode.createClient(
        process.env.ROS2_navigationLockSrvType,
        process.env.ROS2_navigationLockSrvName
      );
      bool = null;
      const userInput = req.body.bool;
      if (userInput === 'true') {
        mapState = 'Navigation Locked';
        bool = true;
      } else if (userInput === 'false') {
        mapState = 'Navigation Unlocked';
        bool = false;
      }
      client.waitForService(1000).then((result) => {
        if (!result) {
          res.status(500).json({
            success: false,
            message: 'Error: service not available',
          });
          console.log('Error: service not available');
          return;
        }
        console.log(userInput);
        client.sendRequest(bool, (response) => {
          console.log(`Result: ${typeof response}`, response);
          res.status(200).json({
            success: true,
            message: `sending ${userInput}  ...`,
          });
        });
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'error while locking navigation ',
        error,
      });
    });
};
