const os = require('os');

const networkInterfaces = os.networkInterfaces();
var ipAddresses = [];
Object.keys(networkInterfaces).forEach((interfaceName) => {
  // console.log(`IP addresses for ${interfaceName}:`);
  networkInterfaces[interfaceName].forEach((address) => {
    // console.log(`${address.address}`);
    ipAddresses.push(address.address);
  });
});
console.log(ipAddresses);
