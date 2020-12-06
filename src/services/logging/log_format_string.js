const _ = require('lodash');
const chalk = require('chalk');

const LogFormat = require('./log_format');

const statuses = ['err', 'info', 'error', 'warning', 'fatal', 'status', 'debug'];

const typeColors = {
  log: 'white',
  req: 'green',
  res: 'green',
  ops: 'cyan',
  config: 'cyan',
  err: 'red',
  info: 'green',
  error: 'red',
  warning: 'red',
  fatal: 'magentaBright',
  status: 'yellowBright',
  debug: 'gray',
  server: 'gray',
  optmzr: 'white',
  manager: 'green',
  optimize: 'magentaBright',
  'optimize:dynamic_dll_plugin': 'magentaBright',
  'optimize:watch_cache': 'magentaBright',
  listening: 'magentaBright',
  scss: 'magentaBright',
  index: 'yellowBright',
  swagger: 'blueBright',
  mongo: 'yellowBright',
  connecting: 'blueBright',
  connected: 'greenBright',
  disconnected: 'red',
  uninitialized: 'red',
  disconnecting: 'red',
  api: 'cyanBright',
};

const color = _.memoize(function (name) {
  return chalk[typeColors[name]] || _.identity;
});

const type = _.memoize(function (t) {
  return color(t)(_.pad(t, 7).slice(0, 7));
});

class LoggerStringFormat extends LogFormat {
  format(data) {
    const time = color('time')(this.extractAndFormatTimestamp(data, 'HH:mm:ss.SSS'));
    const msg = data.error ? color('error')(data.error.stack) : color('message')(data.message);
    if (data.user) {
      const { email } = data.user;
      data.tags.push(`${email}`);
    }

    const tags = _(data.tags)
      .sortBy(function (tag) {
        if (color(tag) === _.identity) return `2${tag}`;
        if (_.includes(statuses, tag)) return `0${tag}`;
        return `1${tag}`;
      })
      .reduce(function (s, t) {
        if (typeof t !== 'object') {
          return s + `[${color(t)(t)}]`;
        } else {
          return s;
        }
      }, '');

    return `${type(data.type)} [${time}] ${tags} ${msg}`;
  }
}

module.exports = LoggerStringFormat;
