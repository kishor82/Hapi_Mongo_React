const good = require('@elastic/good');
const loggingConfiguration = require('./configuration');
const logWithMetadata = require('./log_with_metadata');


const setupLogging = async (server, config) => {
  return await server.register({
    plugin: good,
    options: loggingConfiguration(config)
  });
};

const loggingMixin = async (server, config) => {
  logWithMetadata.decorateServer(server);
  await setupLogging(server, config.logging);
};
module.exports = loggingMixin;
