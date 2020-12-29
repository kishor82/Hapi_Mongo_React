const isPlainObject = require('lodash').isPlainObject;
const symbol = Symbol('log message with metadata');

const logWithMetadata = {
  isLogEvent(eventData) {
    return Boolean(isPlainObject(eventData) && eventData[symbol]);
  },

  getLogEventData(eventData) {
    const { message, metadata } = eventData[symbol];
    return {
      ...metadata,
      message
    };
  },

  decorateServer(server) {
    server.decorate('server', 'logWithMetadata', (tags, message, metadata = {}) => {
      server.log(tags, {
        [symbol]: {
          message,
          metadata,
        },
      });
    });
  },
};

module.exports = logWithMetadata;