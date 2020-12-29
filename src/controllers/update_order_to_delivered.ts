import { Request } from '@hapi/hapi';
export default ({ getOrderById, generateCustomError, wrapError }: any) => {
  return async (request: Request) => {
    try {
      const { id: _id } = request.params;
      const order = await getOrderById({ _id });

      if (!order) {
        throw generateCustomError('Order not found', 404);
      }
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      return {
        statusCode: 200,
        data: updatedOrder,
      };
    } catch (err) {
      throw wrapError(err);
    }
  };
};
