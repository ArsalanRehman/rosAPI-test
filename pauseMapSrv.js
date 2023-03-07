const rosnodejs = require('rosnodejs');
async function test() {
  try {
    await rosnodejs.initNode('/test');
    const nh = rosnodejs.nh;
    const client = nh.serviceClient('/pause_mapping', 'std_srvs/SetBool');
    data = true;
    const result = await client.call({ data: data });
    console.log(result);
    console.log('Service call successfull');
    client.shutdown();
    // client.shutdown(true)
    // await nh.shutdown();
  } catch (err) {
    console.log('Error while calling the service: ', err);
  }
}
test();
