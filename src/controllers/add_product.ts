import { Request, ResponseToolkit } from '@hapi/hapi';
export default ({ addProduct, wrapError }: any) => {
  return async (request: Request, h: ResponseToolkit) => {
    try {
      const { _id } = request.auth.credentials;
      const product = await addProduct({
        productData: {
          name: 'Sample name',
          price: 0,
          user: _id,
          image: '/images/sample.png',
          brand: 'TBD',
          category: 'TBD',
          countInStock: 0,
          numReviews: 0,
          description: 'Sample description',
        },
      });
      return h.response({ statusCode: 201, data: product }).code(201);
    } catch (err) {
      throw wrapError(err);
    }
  };
};
