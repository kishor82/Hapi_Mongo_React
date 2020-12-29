const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

function toPojo(obj) {
  return JSON.parse(JSON.stringify(obj, getCircularReplacer()));
}

function replacer(match, group) {
  return (new Array(group.length + 1).join('X'));
}

function apply(obj, key, action) {
  for (const k in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(k)) {
      let val = obj[k];
      if (k === key) {
        if (action === 'remove') {
          delete obj[k];
        }
        else if (action === 'censor' && typeof val === 'object') {
          delete obj[key];
        }
        else if (action === 'censor') {
          obj[k] = ('' + val).replace(/./g, 'X');
        }
        else if (/\/.+\//.test(action)) {
          const matches = action.match(/\/(.+)\//);
          if (matches) {
            const regex = new RegExp(matches[1]);
            obj[k] = ('' + val).replace(regex, replacer);
          }
        }
      } else if (typeof val === 'object') {
        val = apply(val, key, action);
      }
    }
  }
  return obj;
}

module.exports = function (obj, actionsByKey) {
  return Object.keys(actionsByKey).reduce((output, key) => {
    return apply(output, key, actionsByKey[key]);
  }, toPojo(obj));
};
