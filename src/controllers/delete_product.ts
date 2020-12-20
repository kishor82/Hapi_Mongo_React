import { Request } from '@hapi/hapi';
export default ({ deleteProductById, generateCustomError, wrapError }: any) => {
  return async (request: Request) => {
    try {
      const { id: _id } = request.params;
      const user = await deleteProductById({ _id });
      if (!user) {
        throw generateCustomError('Product not found', 404);
      }
      return { statusCode: 200, data: { message: 'Product removed successfully.' } };
    } catch (err) {
      throw wrapError(err);
    }
  };
};
