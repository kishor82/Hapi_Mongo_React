import { Request } from '@hapi/hapi';
export default ({ updateProductById, generateCustomError, wrapError }: any) => {
  return async (request: Request) => {
    try {
      const { id: _id } = request.params;
      const { _id: userId } = request.auth.credentials;
      const product = await updateProductById({
        _id,
        dataToUpdate: {
          user: userId,
          ...(request.payload as any),
        },
      });

      if (!product) {
        throw generateCustomError('Product not found', 404);
      }
      return {
        statusCode: 200,
        data: product,
      };
    } catch (err) {
      throw wrapError(err);
    }
  };
};
