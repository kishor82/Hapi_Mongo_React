import Boom from 'boom';
const getErrorStatusCode = (error: any) => {
  return Boom.isBoom(error) ? error.output.statusCode : error.statusCode || error.status;
};

const wrapError = (error: any) => {
  return Boom.boomify(error, { statusCode: getErrorStatusCode(error) });
};

export default wrapError;
