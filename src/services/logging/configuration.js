const _ = require('lodash');
const getLoggerStream = require('./log_reporter');

const loggingConfiguration = (config) => {
  const events = {};

  if (config.silent) {
    _.defaults(events, {});
  }
  else if (config.quiet) {
    _.defaults(events, {
      log: ['listening', 'error', 'fatal'],
      request: ['error'],
      error: '*'
    });
  }
  else if (config.verbose) {
    _.defaults(events, {
      log: '*',
      ops: '*',
      request: '*',
      response: '*',
      error: '*'
    });
  }
  else {
    _.defaults(events, {
      log: ['info', 'warning', 'error', 'fatal'],
      response: config.json ? '*' : '!',
      request: ['info', 'warning', 'error', 'fatal'],
      error: '*'
    });
  }
  const loggerStream = getLoggerStream({
    config: {
      json: config.dest === 'stdout' ? !process.stdout.isTTY : config.json,
      dest: config.dest,
      timezone: config.timezone,
      filter: _.defaults({}, {
        authorization: 'remove',
        cookie: 'remove',
      })
    },
    events: _.transform(events, (filtered, val, key) => {
      if (val !== '!') filtered[key] = val;
    }, {})
  });

  const options = {
    ops: {
      interval: config.ops.interval
    },
    includes: {
      request: ['headers', 'payload']
    },
    reporters: {
      logReporter: [loggerStream],
    }
  };
  return options;
};

module.exports = loggingConfiguration;