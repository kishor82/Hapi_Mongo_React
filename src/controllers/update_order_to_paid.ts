import { Request } from '@hapi/hapi';
export default ({ getOrderById, generateCustomError, wrapError }: any) => {
  return async (request: Request) => {
    try {
      const { id: _id } = request.params;
      const { id, status, upate_time, payer } = request.payload as any;

      const order = await getOrderById({ _id });

      if (!order) {
        throw generateCustomError('Order not found', 404);
      }
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id,
        status,
        upate_time,
        email_address: payer.email_address,
      };

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
