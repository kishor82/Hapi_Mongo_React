import { Request } from '@hapi/hapi';
export default ({ findOrderByUserId, wrapError }: any) => {
  return async (request: Request) => {
    try {
      const { _id: userId } = request.auth.credentials;
      const orders = await findOrderByUserId({ userId });
      return { statusCode: 200, data: orders };
    } catch (err) {
      throw wrapError(err);
    }
  };
};
