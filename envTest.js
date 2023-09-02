const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const result = dotenv.config({ path: './config.env' });
dotenvExpand.expand(result);
console.log(process.env.VALUE);
