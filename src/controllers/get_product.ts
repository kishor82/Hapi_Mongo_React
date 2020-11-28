import { Request, ResponseToolkit } from '@hapi/hapi';
export default ({ getProduct, generateCustomError, wrapError }: any) => {
  return async (request: Request, h: ResponseToolkit) => {
    try {
      const product = await getProduct({ _id: request.params.id });
      if (!product) {
        throw generateCustomError('Product not found', 404);
      }
      return { statusCode: 200, data: product };
    } catch (err) {
      throw wrapError(err);
    }
  };
};
