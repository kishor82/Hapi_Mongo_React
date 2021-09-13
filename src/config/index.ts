import { join } from 'path';
const ENV = process.env && process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';
let config_path = 'config';
if (ENV !== 'production') {
  config_path = `config.${ENV}`;
}
const config = require(join(__dirname, config_path));
export default config;
