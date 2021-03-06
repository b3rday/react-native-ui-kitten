const path = require('path');

const playgroundPath = path.resolve(__dirname, '../src/playground');

module.exports = {
  ENV: 'prod',
  KITTEN_PATH: path.resolve(__dirname, '../src/framework'),
  MAPPING_PATH: path.resolve(playgroundPath, 'node_modules/@eva-design/eva'),
  PROCESSOR_PATH: path.resolve(__dirname, '../node_modules/@eva-design/processor')
};
