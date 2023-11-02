// Define getIP function
function getIp(interfaces) {
    for (const interfaceName in interfaces) {
      const interface = interfaces[interfaceName];
      for (const address of interface) {
        if (address.family === "IPv4" && !address.internal) {
          return address.address;
        }
      }
    }
  }
  
module.exports = getIp;
  