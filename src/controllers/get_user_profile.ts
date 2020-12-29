import { Request } from '@hapi/hapi';
export default ({ getUserById, generateCustomError, wrapError }: any) => {
  return async (request: Request) => {
    try {
      const { _id } = request.auth.credentials;
      const user = await getUserById({ _id });
      if (!user) {
        throw generateCustomError('User not found', 404);
      }
      return { statusCode: 200, data: user };
    } catch (err) {
      throw wrapError(err);
    }
  };
};
