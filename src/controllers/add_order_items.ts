import { Request, ResponseToolkit } from '@hapi/hapi';
export default ({ addOrderItems, wrapError }: any) => {
  return async (request: Request, h: ResponseToolkit) => {
    try {
      const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shipingPrice,
        totalPrice,
      } = request.payload as any;
      const createdOrder = await addOrderItems({
        orderData: {
          user: request.auth?.credentials?._id,
          orderItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shipingPrice,
          totalPrice,
        },
      });
      return h.response({ statusCode: 201, data: createdOrder }).code(201);
    } catch (err) {
      throw wrapError(err);
    }
  };
};
