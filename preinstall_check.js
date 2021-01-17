const isUsingNpm = process.env.npm_config_git !== undefined;
const packageJson = require('./package.json');
const fs = require('fs');
const path = require('path');
fs.mkdir(path.join(__dirname, 'client'), (err) => {
  if (err) {
    // Don't do anything if directory already exist.
  } else {
    console.log('\x1b[33m%s\x1b[0m \x1b[1m%s\x1b[0m', `${path.join(__dirname, 'client')}`, 'Created.');
  }
});

const getVersionNumber = (string) => string.replace(/^\D+/g, '');
if (process.version) {
  if (getVersionNumber(process.version).substr(0, 5) < getVersionNumber(packageJson.engines.node).substr(0, 5)) {
    console.log(
      '\x1b[1m%s\x1b[0m \x1b[33m%s\x1b[0m \x1b[1m%s\x1b[0m \x1b[33m%s\x1b[0m',
      `- Expected node version`,
      `"${packageJson.engines.node}"`,
      ` or above, Got `,
      `"${process.version.substr(1, process.version.length)}"`
    );
  }
}
if (isUsingNpm) {
  console.log(
    '\x1b[1m%s\x1b[0m \x1b[33m%s\x1b[0m \x1b[1m%s\x1b[0m \x1b[33m%s\x1b[0m',
    '- Use',
    'yarn',
    'instead of',
    'npm'
  );
  process.exit(1);
}
