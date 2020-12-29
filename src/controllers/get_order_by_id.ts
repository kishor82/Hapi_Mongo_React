import { Request, ResponseToolkit } from '@hapi/hapi';
export default ({ getOrderById, generateCustomError, wrapError }: any) => {
  return async (request: Request, h: ResponseToolkit) => {
    try {
      const { id: _id } = request.params;
      const order = await getOrderById({ _id });
      if (!order) {
        throw generateCustomError('Order not found', 404);
      }
      return { statusCode: 200, data: order };
    } catch (err) {
      throw wrapError(err);
    }
  };
};
