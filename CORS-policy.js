const os = require('os');
const network = require('network');

function getWirelessIP() {
  const interfaces = os.networkInterfaces();
  let wirelessIP = null;

  Object.keys(interfaces).forEach((interfaceName) => {
    const interfaceInfo = interfaces[interfaceName];
    const wirelessInterface = interfaceInfo.find(
      (iface) =>
        iface.family === 'IPv4' &&
        !iface.internal &&
        iface.mac !== '00:00:00:00:00:00'
    );

    if (wirelessInterface) {
      wirelessIP = wirelessInterface.address;
    }
  });

  return wirelessIP;
}

const wirelessIP = getWirelessIP();
console.log('Wireless IP address:', wirelessIP);
