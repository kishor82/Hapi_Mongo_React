import { Request } from '@hapi/hapi';
export default ({ getAllProducts, wrapError }: any) => {
  return async (request: Request) => {
    try {
      const { keyword } = request.query as any;
      const query = keyword
        ? {
            name: {
              $regex: keyword,
              $options: 'i',
            },
          }
        : {};
      const products = await getAllProducts({ query });
      return { statusCode: 200, data: products };
    } catch (err) {
      return wrapError(err);
    }
  };
};
