import { Request, ResponseToolkit } from '@hapi/hapi';
export default ({ getAllOrders, generateCustomError, wrapError }: any) => {
  return async (request: Request, h: ResponseToolkit) => {
    try {
      const orders = await getAllOrders();
      return { statusCode: 200, data: orders };
    } catch (err) {
      throw wrapError(err);
    }
  };
};
