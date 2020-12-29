const LogFormat = require('./log_format');
const stringify = require('json-stringify-safe');

const stripColors = (string) => {
  // eslint-disable-next-line no-control-regex
  return string.replace(/\u001b[^m]+m/g,'');
};

class LoggerJsonFormat extends LogFormat {
  format(data) {
    data.message = stripColors(data.message);
    data['@timestamp'] = this.extractAndFormatTimestamp(data);
    return stringify(data);
  }
}

module.exports = LoggerJsonFormat;