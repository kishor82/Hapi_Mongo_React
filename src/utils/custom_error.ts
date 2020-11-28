import Boom from 'boom';

const generateCustomError = (message: string, statusCode: number) => {
  const error = Boom.badRequest(`${message}`);
  error.output.statusCode = statusCode;
  return error;
};

export default generateCustomError;
