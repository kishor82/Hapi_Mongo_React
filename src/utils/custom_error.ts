import Boom from 'boom';

const generateCustomError = (message: string, statusCode: number) => {
  const error = Boom.badRequest(`${message}`);
  error.output.statusCode = statusCode;
  error.output.payload.statusCode = statusCode;
  return error;
};

export default generateCustomError;
