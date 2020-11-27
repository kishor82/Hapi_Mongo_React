import { Request, ResponseToolkit } from '@hapi/hapi';
export default ({ getProduct, wrapError }: any) => {
  return async (request: Request, h: ResponseToolkit) => {
    try {
      const product = await getProduct({ _id: request.params.id });
      if (!product) {
        return h.response({ message: 'Product not found' }).code(404);
      }
      return { statusCode: 200, data: product };
    } catch (err) {
      return err;
    }
  };
};
