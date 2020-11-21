const Squeeze = require('@hapi/good-squeeze').Squeeze;
const writeStr = require('fs').createWriteStream;

const LogFormatJson = require('./log_format_json');
const LogFormatString = require('./log_format_string');
const LogInterceptor = require('./log_interceptor');

process.stdout.setMaxListeners(25);

const getLoggerStream = ({ events, config }) => {
  const squeeze = new Squeeze(events);
  const format = config.json ? new LogFormatJson(config) : new LogFormatString(config);
  const logInterceptor = new LogInterceptor();

  let dest;

  if (config.dest === 'stdout') {
    dest = process.stdout;
  } else {
    dest = writeStr(config.dest, {
      flags: 'a',
      encoding: 'utf8'
    });

    logInterceptor.on('end', () => {
      dest.end();
    });
  }

  logInterceptor.pipe(squeeze).pipe(format).pipe(dest);

  return logInterceptor;
};

module.exports = getLoggerStream;