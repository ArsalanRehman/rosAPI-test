const rclnodejs = require('rclnodejs');

async function main() {
  await rclnodejs.init();
  const node = new rclnodejs.Node('subscription_message_example_node');

  let param = 50;

  // create a content-filter to limit incoming messages to
  // only those with temperature > paramC.
  const options = rclnodejs.Node.getDefaultOptions();
  options.contentFilter = {
    expression: 'temperature > %0',
    parameters: [param],
  };

  let count = 0;
  let subscription;
  try {
    subscription = node.createSubscription(
      'sensor_msgs/msg/Temperature',
      'temperature',
      options,
      (temperatureMsg) => {
        console.log(`Received temperature message-${++count}: 
${temperatureMsg.temperature}C`);
        if (count % 5 === 0) {
          if (subscription.hasContentFilter()) {
            console.log('Clearing filter');
            subscription.clearContentFilter();
          } else if (param < 100) {
            param += 10;
            console.log('Update topic content-filter, temperature > ', param);
            const contentFilter = {
              expression: 'temperature > %0',
              parameters: [param],
            };
            subscription.setContentFilter(contentFilter);
          }
          console.log(
            'Content-filtering enabled: ',
            subscription.hasContentFilter()
          );
        }
      }
    );

    if (!subscription.hasContentFilter()) {
      console.log('Content-filtering is not enabled on subscription.');
    }
  } catch (error) {
    console.error('Unable to create content-filtering subscription.');
    console.error(
      'Please ensure your content-filter expression and parameters are well-formed.'
    );
  }

  node.spin();
}

main();
