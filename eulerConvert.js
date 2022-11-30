const convert = require('euler-to-quaternion')
euler = [ 0.009492589392304959, 0.0021659919265802946, -0.19825506086634434 ];
const result =  convert(euler);
console.log(result);