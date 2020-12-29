const Hoek = require('hoek');
const defaultValidationErrorHandler = (_request: any, _h: any, err: any) => {
  // eslint-disable-next-line no-prototype-builtins
  if (err && err.name === 'ValidationError' && err.hasOwnProperty('output')) {
    const validationError = err;
    const validationKeys: string[] = [];
    const validationMessage: string[] = [];

    validationError.details.forEach((detail: { path: any[]; message: string }) => {
      if (detail.path.length > 0) {
        validationKeys.push(Hoek.escapeHtml(detail.path.join('.')));
        validationMessage.push(detail.message);
      } else {
        // If no path, use the value sigil to signal the entire value had an issue.
        validationKeys.push('value');
        validationMessage.push('Invalid request payload.');
      }
    });
    validationError.output.payload.validation.keys = validationKeys;
    validationError.output.payload.message = validationMessage;
  }
  throw err;
};

export default defaultValidationErrorHandler;
