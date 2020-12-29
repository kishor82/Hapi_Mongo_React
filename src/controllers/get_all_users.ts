import { Request, ResponseToolkit } from '@hapi/hapi';
export default ({ getAllUsers, wrapError }: any) => {
  return async (request: Request, h: ResponseToolkit) => {
    try {
      const users = await getAllUsers();
      return { statusCode: 200, data: users };
    } catch (err) {
      throw wrapError(err);
    }
  };
};
