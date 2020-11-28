import { Request, ResponseToolkit } from '@hapi/hapi';
export default ({ getUserById, wrapError }: any) => {
  return async (request: Request, h: ResponseToolkit) => {
    try {
      const { _id } = request.auth.credentials;
      const user = await getUserById({ _id });
      if (!user) {
        return h.response({ statusCode: 404, data: { message: 'User not found' } }).code(404);
      }
      return { statusCode: 200, data: user };
    } catch (err) {
      throw wrapError(err);
    }
  };
};
